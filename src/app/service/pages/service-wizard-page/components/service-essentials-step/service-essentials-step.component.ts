import { Component, forwardRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Price } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import * as AppValidators from '@app/core/validators';
import { ServiceEssentialsInterface } from '@app/service/pages/service-wizard-page/interfaces';
import { AggregatedState } from '@app/service/pages/service-wizard-page/interfaces/steps-state.type';
import { StepComponent } from '../step/step';

const emptyPrice: Price = {
  is_price_fixed: true,
  payment_methods: [],
  service: NaN,
};

@Component({
  selector: 'app-service-info-step',
  templateUrl: './service-essentials-step.component.html',
  styleUrls: ['./service-essentials-step.component.scss'],
  providers: [
    {
      provide: StepComponent,
      useExisting: forwardRef(() => ServiceEssentialsStepComponent),
    },
    NgDestroyService,
  ],
})
export class ServiceEssentialsStepComponent extends StepComponent<ServiceEssentialsInterface> {
  public formFields: { [K in keyof ServiceEssentialsInterface]: keyof ServiceEssentialsInterface } = {
    name: 'name',
    duration: 'duration',
    price: 'price',
    payment_methods: 'payment_methods',
  };

  constructor() {
    super();
    this.form = this.createForm();
  }

  public setState(state: AggregatedState): void {
    const newValue: ServiceEssentialsInterface = {
      name: state.name ?? '',
      duration: state.duration ?? 0,
      price: state.price ?? emptyPrice,
      payment_methods: state.payment_methods ?? [],
    };
    this.form.setValue(newValue);
  }

  private createForm(): FormGroup {
    return new FormGroup({
      [this.formFields.name]: new FormControl('', [Validators.required, AppValidators.serviceNameValidator]),
      [this.formFields.duration]: new FormControl('', Validators.required),
      [this.formFields.price]: new FormControl(emptyPrice, AppValidators.priceIntervalValidator),
      [this.formFields.payment_methods]: new FormControl([], Validators.required),
    });
  }
}
