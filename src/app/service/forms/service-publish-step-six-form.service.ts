import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { ServicePublishStepSixFormFields } from '@app/service/enums/service-publish-step-six-form-fields';
import { StepSixDataInterface } from '@app/service/interfaces/step-six-data-interface';

@Injectable()
export class ServicePublishStepSixFormService {

  public form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
  }

  private static companyNameValidator(group: FormGroup): ValidationErrors | null {
    const invalid = group.get(ServicePublishStepSixFormFields.IsCompany).value === 'company'
      && !group.get(ServicePublishStepSixFormFields.CompanyName).value;

    return invalid ? { emptyCompanyNameError: true } : null;
  }

  public createForm(data?: StepSixDataInterface): void {
    this.form = this.formBuilder.group({
      [ServicePublishStepSixFormFields.IsCompany]: [data?.is_company ?? 'person'],
      [ServicePublishStepSixFormFields.CompanyName]: [data?.company_name],
      [ServicePublishStepSixFormFields.Description]: [data?.description],
      [ServicePublishStepSixFormFields.Specialization]: [data?.name],
      [ServicePublishStepSixFormFields.Level]: [data?.level],
    }, { validators: ServicePublishStepSixFormService.companyNameValidator });
  }

  public isSubmitDisabled(): boolean {
    return this.form.invalid;
  }
}
