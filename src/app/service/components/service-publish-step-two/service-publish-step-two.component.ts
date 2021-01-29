import { Component } from '@angular/core';
import { serviceTypes } from '@app/core/types/service-types';
import { ServicePublishStepTwoFormFields } from '@app/service/enums/service-publish-step-two-form-fields';
import { ServicePublishSteps } from '@app/service/enums/service-publish-steps';
import { ServicePublishStepTwoFormService } from '@app/service/forms/service-publish-step-two-form.service';
import { StepTwoDataInterface } from '@app/service/interfaces/step-two-data-interface';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import { ServiceStepsNavigationService } from '@app/service/services/service-steps-navigation.service';
import { Reinitable } from '@app/shared/abstract/reinitable';

@Component({
  selector: 'app-service-publish-step-two',
  templateUrl: './service-publish-step-two.component.html',
  styleUrls: ['./service-publish-step-two.component.scss'],
})
export class ServicePublishStepTwoComponent extends Reinitable {

  public readonly serviceTypes = serviceTypes;
  public readonly formFields = ServicePublishStepTwoFormFields;

  constructor(
    private readonly servicePublishDataHolder: ServicePublishDataHolderService,
    public readonly formService: ServicePublishStepTwoFormService,
    public readonly serviceStepsNavigationService: ServiceStepsNavigationService,
  ) {
    super();
  }

  public submitForm(): void {
    this.servicePublishDataHolder.setStepData<StepTwoDataInterface>(
      ServicePublishSteps.Two, this.formService.form.getRawValue(),
    );
    this.serviceStepsNavigationService.next();
  }

  protected init(): void {
    if (this.servicePublishDataHolder.isset(ServicePublishSteps.Two)) {
      this.formService.createForm(
        this.servicePublishDataHolder.getStepData<StepTwoDataInterface>(ServicePublishSteps.Two),
      );
    } else {
      this.formService.createForm();
    }
  }
}
