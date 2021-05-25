import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProfessionalLocationInline } from '@app/api/models';
import { AccountsService } from '@app/api/services/accounts.service';
import { UserLocationApiService } from '@app/core/services';
import { FullLocationService } from '@app/core/services/location/full-location.service';
import { StepComponent } from '@app/order/abstract/step';
import LocationStepData from '@app/order/interfaces/location-step-data.interface';
import StepContext from '@app/order/interfaces/step-context.interface';
import { LocationEditorPopoverComponent } from '@app/shared/components';
import { PopoverController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

export enum LocationType {
  Online = 'online',
  Professional = 'professional',
  Client = 'client',
}

const initState: LocationStepData = {
  service_location: null,
  client_location: null,
};

@Component({
  selector: 'app-location-step',
  templateUrl: './location-step.component.html',
  styleUrls: ['./location-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: StepComponent,
      useExisting: forwardRef(() => LocationStepComponent),
    },
  ],
})
export class LocationStepComponent extends StepComponent<LocationStepData> {
  public locationLabel: string;
  public locations: { id: number; text: string }[];
  public formControl = new FormControl('', Validators.required);
  private locationKey: string;

  constructor(
    private readonly fullLocationService: FullLocationService,
    private readonly userLocationService: UserLocationApiService,
    private readonly popoverController: PopoverController,
    private readonly api: AccountsService,
    protected readonly cd: ChangeDetectorRef,
  ) {
    super(cd);
    this.subscribeFormControl();
  }

  public get hasLocations(): boolean {
    return Boolean(this.locations?.length) || this.context.service.service_type !== 'professional';
  }

  public get canAddLocation(): boolean {
    return this.context.service.service_type === 'client';
  }

  public async addNewLocation(): Promise<void> {
    const popover = await this.popoverController.create({
      component: LocationEditorPopoverComponent,
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    this.api.accountsLocationsCreate(data).subscribe(() => this.loadLocations());
  }

  protected onStateChanged(data: LocationStepData): void {
    this.setFormControlValue(data?.[this.locationKey]);
  }

  protected onContextChanged(context: StepContext): void {
    super.onContextChanged(context);
    this.loadLocations();
  }

  private setFormControlValue(value: any): void {
    setTimeout(() => {
      this.formControl.setValue(value);
    });
  }

  private loadLocations(): void {
    this.locations = null;
    const { service = null } = this.context;
    switch (service.service_type) {
      case LocationType.Online: {
        this.locationLabel = 'service-location.online';
        this.locationKey = null;
        this.locations = [];
        setTimeout(() => {
          this.formControl.setValue('online');
        });
        break;
      }
      case LocationType.Professional: {
        this.locationLabel = 'service-location.professional';
        this.locationKey = 'service_location';
        this.getServiceLocations();
        break;
      }
      case LocationType.Client: {
        this.locationLabel = 'service-location.client';
        this.locationKey = 'client_location';
        this.getClientLocations();
        break;
      }
      default:
        break;
    }
  }

  // TODO Extract getting locations out of component
  private getServiceLocations(): void {
    const locationsObservables = this.context.service.locations.map(({ location }) =>
      this.fullLocationService.getTextLocation(location),
    );
    forkJoin(locationsObservables)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(locations => {
        this.locations = locations;
        this.setFormControlValue(locations[0]?.id);
        this.cd.markForCheck();
      });
  }

  private getClientLocations(): void {
    this.userLocationService
      .getByClientId()
      .pipe(
        switchMap(({ results: locations }) =>
          forkJoin(
            locations.map(location =>
              this.fullLocationService.getTextLocation((location as unknown) as ProfessionalLocationInline),
            ),
          ),
        ),
        takeUntil(this.ngDestroy$),
      )
      .subscribe(locations => {
        this.locations = locations;
        this.setFormControlValue(locations[0]?.id);
        this.cd.markForCheck();
      });
  }

  private subscribeFormControl(): void {
    this.formControl.statusChanges.pipe(takeUntil(this.ngDestroy$)).subscribe(() => {
      this.outputData = this.formControl.valid ? this.getStepState() : null;
      this.isValid$.next(this.formControl.valid);
    });
  }

  private getStepState(): LocationStepData {
    return this.locationKey
      ? {
          ...initState,
          [this.locationKey]: this.formControl.value,
        }
      : initState;
  }
}
