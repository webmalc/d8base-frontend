import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccountsService } from '@app/api/services';
import { LocationResolverService, NgDestroyService } from '@app/core/services';
import { UserManagerService } from '@app/core/services/managers/user-manager.service';
import * as AppValidators from '@app/core/validators';
import { StepComponent } from '@app/booking/abstract/step';
import { OrderClientDetailsFormFields } from '@app/booking/enums/order-client-details-form';
import { OrderIds } from '@app/booking/enums/order-ids.enum';
import { ClientDetailsStepData } from '@app/booking/interfaces/client-details-step-data.type';
import StepContext from '@app/booking/interfaces/step-context.interface';
import { OrderLocationsService } from '@app/booking/services/order-locations.service';
import { LocationEditorPopoverComponent } from '@app/shared/location-editor/location-editor-popover/location-editor-popover.component';
import { PopoverController } from '@ionic/angular';
import { combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

const emptyLocation = {
  service_location: null,
  client_location: null,
};

@Component({
  selector: 'app-client-details-step',
  templateUrl: './client-details-step.component.html',
  styleUrls: ['./client-details-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: StepComponent,
      useExisting: forwardRef(() => ClientDetailsStepComponent),
    },
    NgDestroyService,
  ],
})
export class ClientDetailsStepComponent extends StepComponent<ClientDetailsStepData> implements OnInit {
  public formFields = OrderClientDetailsFormFields;
  public locationFormControl = new FormControl('', Validators.required);
  public isSelfOrder: boolean = false;
  public locations: { id: number; text: string }[];

  private readonly userFields = [
    this.formFields.firstName,
    this.formFields.lastName,
    this.formFields.email,
    this.formFields.phone,
  ];

  private locationKey: 'service_location' | 'client_location' | '' = '';

  constructor(
    private readonly userManager: UserManagerService,
    private readonly orderLocations: OrderLocationsService,
    private readonly fullLocationService: LocationResolverService,
    private readonly popoverController: PopoverController,
    private readonly api: AccountsService,
    protected readonly cd: ChangeDetectorRef,
    private readonly fb: FormBuilder,
    private readonly ngDestroy$: NgDestroyService,
  ) {
    super();
    this.form = this.fb.group({
      [this.formFields.isAnotherPerson]: [false],
      [this.formFields.firstName]: [{ value: '', disabled: true }, Validators.required],
      [this.formFields.lastName]: [{ value: '', disabled: true }],
      [this.formFields.email]: [{ value: '', disabled: true }, AppValidators.email],
      [this.formFields.phone]: [{ value: '', disabled: true }, Validators.required],
      [this.formFields.comment]: [''],
    });
    this.form.addControl('location', this.locationFormControl);
  }

  public get isOnline(): boolean {
    return this.context?.service.service_type === 'online';
  }

  public get hasLocations(): boolean {
    return Boolean(this.locations?.length) || this.context?.service.service_type !== 'professional';
  }

  public get canAddLocation(): boolean {
    return this.context?.service.service_type === 'client';
  }

  public ngOnInit(): void {
    this.subscribeIsForMeControl();
    this.subscribeStatusChanges();
  }

  public setState(state: any): void {
    const data: ClientDetailsStepData = state[OrderIds.clientDetails];
    if (!data) {
      return;
    }
    const isAnotherPerson = Boolean(data[this.formFields.isAnotherPerson]);
    this.form.patchValue({
      ...(!isAnotherPerson ? data : {}),
      [this.formFields.isAnotherPerson]: isAnotherPerson,
      [this.formFields.comment]: data[this.formFields.comment],
    });
    const locationValue = data?.[this.locationKey];
    if (locationValue) {
      this.locationFormControl.setValue(locationValue);
    }
    this.disableUserFields(!isAnotherPerson);
  }

  public setContext(context: StepContext): void {
    super.setContext(context);
    this.setSelfOrder();
    this.loadLocations();
    this.form.updateValueAndValidity();
  }

  public async addNewLocation(): Promise<void> {
    const popover = await this.popoverController.create({
      component: LocationEditorPopoverComponent,
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    if (data) {
      this.api.accountsLocationsCreate(data).subscribe(() => this.loadLocations());
    }
  }

  private subscribeIsForMeControl(): void {
    this.form
      .get(this.formFields.isAnotherPerson)
      .valueChanges.pipe(takeUntil(this.ngDestroy$))
      .subscribe(isAnotherPerson => {
        this.disableUserFields(!isAnotherPerson);
        this.cd.markForCheck();
      });
  }

  private subscribeStatusChanges(): void {
    combineLatest([this.form.statusChanges, this.locationFormControl.statusChanges])
      .pipe(
        map(([formStatus, locationStatus]) => formStatus === 'VALID' && locationStatus === 'VALID'),
        takeUntil(this.ngDestroy$),
      )
      .subscribe(isValid => {
        this.outputData = isValid ? this.getStepState() : null;
      });
  }

  private getStepState(): ClientDetailsStepData {
    const location = this.locationKey
      ? {
          ...emptyLocation,
          [this.locationKey]: this.locationFormControl.value as number,
        }
      : emptyLocation;

    const data = this.form.value;
    return !data.is_another_person
      ? {
          note: data.note,
          ...location,
        }
      : {
          is_another_person: true,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          note: data.note,
          ...location,
        };
  }

  private disableUserFields(disabled: boolean = true): void {
    this.userFields.forEach(control => {
      if (disabled) {
        this.form.get(control).disable({ emitEvent: false });
      } else {
        this.form.get(control).enable({ emitEvent: false });
      }
    });
  }

  private setSelfOrder(): void {
    this.isSelfOrder = this.context.isSelfOrder;
  }

  private loadLocations(): void {
    this.locations = null;
    this.locationKey = '';
    if (this.isOnline) {
      this.locationFormControl.setValue('online');
      return;
    }

    this.locationKey = this.context.service.service_type === 'client' ? 'client_location' : 'service_location';
    this.orderLocations.getLocations(this.context.service).subscribe(locations => {
      this.locations = locations;
      this.cd.markForCheck();
    });
  }
}
