import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ProfessionalLocationInline} from '@app/api/models';
import {UserLocationApiService} from '@app/core/services';
import {FullLocationService} from '@app/core/services/location/full-location.service';
import {StepComponent} from '@app/order/abstract/step';
import LocationStepData from '@app/order/interfaces/location-step-data.interface';
import StepContext from '@app/order/interfaces/step-context.interface';
import {forkJoin} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';

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
    public locations: { id: number; text: string }[] = [];
    public formControl = new FormControl('', Validators.required);
    private locationKey: string;

    constructor(
        private readonly fullLocationService: FullLocationService,
        private readonly userLocationService: UserLocationApiService,
        protected readonly cd: ChangeDetectorRef,
    ) {
        super(cd);
        this.subscribeFormControl();
    }

    protected onStateChanged(data: LocationStepData): void {
        this.formControl.setValue(data?.[this.locationKey]);
    }

    protected onContextChanged(context: StepContext): void {
        super.onContextChanged(context);
        const {service = null} = context;
        switch (service.service_type) {
            case LocationType.Online: {
                this.locationLabel = 'service-location.online';
                this.locationKey = null;
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
        const locationsObservables = this.context.service.locations.map(({location}) => {
            return this.fullLocationService.getTextLocation(location);
        });
        forkJoin(locationsObservables)
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(locations => {
                this.locations = locations;
                this.cd.markForCheck();
            });
    }

    private getClientLocations(): void {
        this.userLocationService.getByClientId().pipe(
            switchMap(({results: locations}) => {
                return forkJoin(
                    locations.map((location) =>
                        this.fullLocationService.getTextLocation((location as unknown) as ProfessionalLocationInline)),
                );
            }),
            takeUntil(this.ngDestroy$),
        ).subscribe(locations => {
            this.locations = locations;
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
