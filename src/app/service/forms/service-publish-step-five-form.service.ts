import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServicePublishStepFiveFormFields} from '@app/service/enums/service-publish-step-five-form-fields';
import {StepFiveDataInterface} from '@app/service/interfaces/step-five-data-interface';

@Injectable()
export class ServicePublishStepFiveFormService {

    public form: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    public createForm(data?: StepFiveDataInterface): void {
        this.form = this.formBuilder.group({
            [ServicePublishStepFiveFormFields.IsCompany]: [data?.is_company ?? false, Validators.required],
            [ServicePublishStepFiveFormFields.CompanyName]: [data?.company_name],
            [ServicePublishStepFiveFormFields.FirstName]: [data?.first_name, Validators.required],
            [ServicePublishStepFiveFormFields.LastName]: [data?.last_name, Validators.required],
            [ServicePublishStepFiveFormFields.Gender]: [data?.gender, Validators.required],
            [ServicePublishStepFiveFormFields.Avatar]: [data?._avatar],
        }, {validators: [this.companyNameValidator]});
    }

    public addPhoto(photo: File): void {
        this.form.get(ServicePublishStepFiveFormFields.Avatar).setValue(photo);
    }

    public deletePhoto(): void {
        this.form.get(ServicePublishStepFiveFormFields.Avatar).reset();
    }

    public isSubmitDisabled(): boolean {
        return !(this.form.valid && this.form.dirty);
    }

    private companyNameValidator(group: FormGroup): any {
        if (group.get(ServicePublishStepFiveFormFields.IsCompany).value && !group.get(ServicePublishStepFiveFormFields.CompanyName).value) {
            group.get(ServicePublishStepFiveFormFields.CompanyName).setErrors({emptyCompanyNameError: true});
        }
    }
}
