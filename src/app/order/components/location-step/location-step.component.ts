import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { forkJoin } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ProfessionalLocationService } from '../../../core/services/location/professional-location.service';
import { StepComponent } from '../../abstract/step';
import { LocationStepData, StepContext } from '../../order-steps';

export enum LocationType {
    Online = 'online',
    Professional = 'professional',
    Client = 'client'
}

const initState: LocationStepData = {
    service_location: null,
    client_location: null
};

@Component({
    selector: 'app-location-step',
    templateUrl: './location-step.component.html',
    styleUrls: ['./location-step.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: StepComponent,
            useExisting: forwardRef(() => LocationStepComponent)
        }
    ]
})
export class LocationStepComponent extends StepComponent<any> {
    public locationLabel: string;
    public locations: { id: number; text: string }[] = [];
    public form: FormGroup = this.fb.group({});
    public formControl = new FormControl('', Validators.required);
    private locationKey: string;

    constructor(
        private readonly professionalLocationService: ProfessionalLocationService,
        private readonly fb: FormBuilder,
        protected readonly cd: ChangeDetectorRef
    ) {
        super(cd);
        this.subscribeFormControl();
    }

    protected onStateChanged(data: LocationStepData): void {
        this.formControl.setValue(data?.[this.locationKey], {
            emitEvent: false
        });
    }

    protected onContextChanged(context: StepContext): void {
        super.onContextChanged(context);
        const { service = null } = context;
        switch (service.service_type) {
            case LocationType.Online: {
                this.locationLabel = 'order.location-online';
                this.locationKey = null;
                setTimeout(() => {
                    this.formControl.setValue('online');
                });
                break;
            }
            case LocationType.Professional: {
                this.locationLabel = 'order.location-professional';
                this.locationKey = 'service_location';
                this.getServiceLocations();
                break;
            }
            case LocationType.Client: {
                this.locationLabel = 'order.location-client';
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
        const locationsObservables = this.context.service.locations.map(
            ({ location }) => {
                return this.professionalLocationService
                    .getFullLocation(location)
                    .pipe(
                        map((res) => {
                            const textLocation = ['country', 'city']
                                .map((key) => res?.[key]?.name)
                                .filter((value) => Boolean(value))
                                .join(', ');

                            return {
                                id: location.id,
                                text: `${textLocation}, ${location.address}`
                            };
                        })
                    );
            }
        );
        forkJoin(locationsObservables)
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe((locations) => {
                this.locations = locations;
                this.cd.markForCheck();
            });
    }

    private getClientLocations(): void {
        this.locations = (this.context.client as any).locations.map(
            (location) => {
                const id = location;
                const text = `${location}; Client location API is not implemented yet.`;

                return {
                    id,
                    text
                };
            }
        );
    }

    private subscribeFormControl(): void {
        this.formControl.statusChanges
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(() => {
                const isComplete = this.formControl.valid;
                const data = this.locationKey
                    ? {
                          ...initState,
                          [this.locationKey]: this.formControl.value
                      }
                    : initState;
                this.outputData$.emit({
                    isComplete,
                    data
                });
            });
    }
}
