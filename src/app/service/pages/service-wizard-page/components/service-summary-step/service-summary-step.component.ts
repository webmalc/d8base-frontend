import { Component, forwardRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Service } from '@app/api/models';
import { IonViewWillEnter } from '@app/core/interfaces/ionic.interfaces';
import { ServiceSummaryInterface } from '@app/service/pages/service-wizard-page/interfaces';
import { ServiceBuilderService } from '../../services/service-builder.service';
import { StepComponent } from '../step/step';

@Component({
  selector: 'app-service-summary-step',
  templateUrl: './service-summary-step.component.html',
  styleUrls: ['./service-summary-step.component.scss'],
  providers: [
    {
      provide: StepComponent,
      useExisting: forwardRef(() => ServiceSummaryStepComponent),
    },
  ],
})
export class ServiceSummaryStepComponent extends StepComponent<ServiceSummaryInterface> implements IonViewWillEnter {
  public formFields: { [K in keyof ServiceSummaryInterface]: keyof ServiceSummaryInterface } = {
    is_auto_order_confirmation: 'is_auto_order_confirmation',
    is_enabled: 'is_enabled',
  };
  public service: Service;

  constructor(private readonly serviceBuilder: ServiceBuilderService) {
    super();
    this.form = this.createForm();
  }

  public ionViewWillEnter(): void {
    this.serviceBuilder.build().then(built => (this.service = built.service));
  }

  private createForm(): FormGroup {
    return new FormGroup({
      [this.formFields.is_auto_order_confirmation]: new FormControl(false),
      [this.formFields.is_enabled]: new FormControl(true),
    });
  }
}
