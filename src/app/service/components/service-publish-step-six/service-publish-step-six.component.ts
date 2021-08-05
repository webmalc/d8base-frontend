import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { professionalLevels } from '@app/core/constants/professional.constants';
import { isFormInvalid } from '@app/core/functions/form.functions';
import { TranslationService } from '@app/core/services/translation.service';
import { companyNameValidator } from '@app/core/validators';
import { ServicePublishStepSixFormFields } from '@app/service/enums/service-publish-step-six-form-fields';
import { ServicePublishSteps } from '@app/service/enums/service-publish-steps';
import { StepSixDataInterface } from '@app/service/interfaces/step-six-data-interface';
import { ServicePublishAuthStateManagerService } from '@app/service/services/service-publish-auth-state-manager.service';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import { ServiceStepsNavigationService } from '@app/service/services/service-steps-navigation.service';

@Component({
  selector: 'app-service-publish-step-six',
  templateUrl: './service-publish-step-six.component.html',
  styleUrls: ['./service-publish-step-six.component.scss'],
})
export class ServicePublishStepSixComponent implements OnInit {
  public form: FormGroup;
  public formFields = ServicePublishStepSixFormFields;
  public levelList = professionalLevels;

  constructor(
    public trans: TranslationService,
    public serviceStepsNavigationService: ServiceStepsNavigationService,
    private readonly formBuilder: FormBuilder,
    private readonly servicePublishDataHolder: ServicePublishDataHolderService,
    private readonly authStateManager: ServicePublishAuthStateManagerService,
  ) {}

  public ngOnInit(): void {
    this.authStateManager.updateFourStepState();
    if (this.servicePublishDataHolder.isset(ServicePublishSteps.Six)) {
      this.createForm(this.servicePublishDataHolder.getStepData<StepSixDataInterface>(ServicePublishSteps.Six));
    } else {
      this.createForm();
    }
  }

  public async submitForm(): Promise<void> {
    if (isFormInvalid(this.form)) {
      return;
    }

    await this.servicePublishDataHolder.setStepData<StepSixDataInterface>(
      ServicePublishSteps.Six,
      this.form.getRawValue(),
    );
    this.serviceStepsNavigationService.next();
  }

  private createForm(data?: StepSixDataInterface): void {
    this.form = this.formBuilder.group(
      {
        [ServicePublishStepSixFormFields.IsCompany]: [data?.is_company ?? 'person'],
        [ServicePublishStepSixFormFields.CompanyName]: [data?.company_name],
        [ServicePublishStepSixFormFields.Description]: [data?.description],
        [ServicePublishStepSixFormFields.Specialization]: [data?.name, Validators.required],
        [ServicePublishStepSixFormFields.Level]: [data?.level],
      },
      { validators: companyNameValidator },
    );
  }
}
