import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServicePublishStepFiveFormFields} from '@app/service/enums/service-publish-step-five-form-fields';
import {StepFiveDataInterface} from '@app/service/interfaces/step-five-data-interface';

@Injectable()
export class ServicePublishStepFiveFormService {

    public form: FormGroup;

    constructor(private readonly formBuilder: FormBuilder) {
    }

    public createForm(data?: StepFiveDataInterface): void {
        this.form = this.formBuilder.group({
            [ServicePublishStepFiveFormFields.FirstName]: [data?.first_name, Validators.required],
            [ServicePublishStepFiveFormFields.LastName]: [data?.last_name, Validators.required],
            [ServicePublishStepFiveFormFields.Gender]: [data?.gender, Validators.required],
            [ServicePublishStepFiveFormFields.Avatar]: [data?._avatar],
        });
    }

    public addPhoto(photo: File): void {
        this.form.get(ServicePublishStepFiveFormFields.Avatar).setValue(photo);
    }

    public deletePhoto(): void {
        this.form.get(ServicePublishStepFiveFormFields.Avatar).reset();
    }

    public isSubmitDisabled(): boolean {
        return this.form.invalid;
    }
}
