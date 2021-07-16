import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isFormInvalid } from '@app/core/functions/form.functions';
import { serviceTypes } from '@app/core/types/service-types';
import * as AppValidators from '@app/core/validators';
import { ServicePublishStepTwoFormFields } from '@app/service/enums/service-publish-step-two-form-fields';
import { ServicePublishSteps } from '@app/service/enums/service-publish-steps';
import { StepTwoDataInterface } from '@app/service/interfaces/step-two-data-interface';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import { ServiceStepsNavigationService } from '@app/service/services/service-steps-navigation.service';

@Component({
  selector: 'app-service-publish-step-two',
  templateUrl: './service-publish-step-two.component.html',
  styleUrls: ['./service-publish-step-two.component.scss'],
})
export class ServicePublishStepTwoComponent {
  public readonly serviceTypes = serviceTypes;
  public readonly formFields = ServicePublishStepTwoFormFields;
  public form: FormGroup;

  constructor(
    private readonly servicePublishDataHolder: ServicePublishDataHolderService,
    public readonly serviceStepsNavigationService: ServiceStepsNavigationService,
    private readonly formBuilder: FormBuilder,
  ) {
    if (this.servicePublishDataHolder.isset(ServicePublishSteps.Two)) {
      this.createForm(this.servicePublishDataHolder.getStepData<StepTwoDataInterface>(ServicePublishSteps.Two));
    } else {
      this.createForm();
    }
  }

  public async submitForm(): Promise<void> {
    if (isFormInvalid(this.form)) {
      return;
    }

    await this.servicePublishDataHolder.setStepData<StepTwoDataInterface>(
      ServicePublishSteps.Two,
      this.form.getRawValue(),
    );
    this.serviceStepsNavigationService.next();
  }

  private createForm(data?: StepTwoDataInterface): void {
    this.form = this.formBuilder.group({
      [ServicePublishStepTwoFormFields.Name]: [data?.name, Validators.required],
      [ServicePublishStepTwoFormFields.Description]: [data?.description, AppValidators.descriptionValidator],
      [ServicePublishStepTwoFormFields.Duration]: [data?.duration, Validators.required],
      [ServicePublishStepTwoFormFields.Price]: [data?.price, AppValidators.price],
      [ServicePublishStepTwoFormFields.Location]: [data?.service_type, Validators.required],
    });
  }
}
