import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServicePublishStepSixFormFields} from '@app/service/enums/service-publish-step-six-form-fields';
import {StepSixDataInterface} from '@app/service/interfaces/step-six-data-interface';

@Injectable()
export class ServicePublishStepSixFormService {

    public form: FormGroup;

    constructor(private readonly formBuilder: FormBuilder) {
    }

    public createForm(data?: StepSixDataInterface): void {
        this.form = this.formBuilder.group({
            [ServicePublishStepSixFormFields.IsCompany]: [data?.is_company ?? false, Validators.required],
            [ServicePublishStepSixFormFields.CompanyName]: [data?.company_name],
            [ServicePublishStepSixFormFields.Description]: [data?.description],
            [ServicePublishStepSixFormFields.Specialization]: [data?.name,
                [Validators.required, Validators.minLength(1), Validators.maxLength(255)]
            ],
            [ServicePublishStepSixFormFields.Level]: [data?.level]
        }, {validators: this.companyNameValidator});
    }

    public isSubmitDisabled(): boolean {
        return this.form.invalid;
    }

    private companyNameValidator(group: FormGroup): any {
        if (group.get(ServicePublishStepSixFormFields.IsCompany).value && !group.get(ServicePublishStepSixFormFields.CompanyName).value) {
            group.get(ServicePublishStepSixFormFields.CompanyName).setErrors({emptyCompanyNameError: true});
        }
    }
}
