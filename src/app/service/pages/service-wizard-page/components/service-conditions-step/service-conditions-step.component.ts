import { Component, forwardRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Service } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import { serviceTypes } from '@app/core/types/service-types';
import { ServiceConditionsInterface } from '@app/service/pages/service-wizard-page/interfaces';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StepComponent } from '../step/step';

const defaultServiceType: Service['service_type'] = 'online';

@Component({
  selector: 'app-service-conditions-step',
  templateUrl: './service-conditions-step.component.html',
  styleUrls: ['./service-conditions-step.component.scss'],
  providers: [
    {
      provide: StepComponent,
      useExisting: forwardRef(() => ServiceConditionsStepComponent),
    },
    NgDestroyService,
  ],
})
export class ServiceConditionsStepComponent extends StepComponent<ServiceConditionsInterface> {
  public formFields: { [K in keyof ServiceConditionsInterface]: keyof ServiceConditionsInterface } = {
    schedule: 'schedule',
    is_base_schedule: 'is_base_schedule',
    service_type: 'service_type',
    location: 'location',
  };
  public readonly serviceTypes = serviceTypes;
  public professionalId$: Observable<number>;
  public schedule$ = of([]);

  constructor(store: Store) {
    super();
    this.form = this.createForm();
    this.professionalId$ = store.select(CurrentUserSelectors.defaultProfessional).pipe(map(p => p.id));
  }

  public setState(state: ServiceConditionsInterface): void {
    const newValue: ServiceConditionsInterface = {
      service_type: state.service_type ?? defaultServiceType,
      location: state.location ?? null,
      is_base_schedule: state.is_base_schedule ?? true,
      schedule: state.schedule ?? [],
    };
    this.form.setValue(newValue);
  }

  private createForm(): FormGroup {
    return new FormGroup({
      [this.formFields.schedule]: new FormControl([]),
      [this.formFields.is_base_schedule]: new FormControl(true),
      [this.formFields.service_type]: new FormControl(defaultServiceType, Validators.required),
      [this.formFields.location]: new FormControl(null),
    });
  }
}
