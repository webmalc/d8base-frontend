import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServicePublishStepFourFormFields} from '@app/service/enums/service-publish-step-four-form-fields';
import {StepFourDataInterface} from '@app/service/interfaces/step-four-data-interface';

@Injectable()
export class ServicePublishStepFourFormService {

    public form: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    public createForm(data?: StepFourDataInterface): void {
        this.form = this.formBuilder.group({
                [ServicePublishStepFourFormFields.Email]: [data?.email ?? '', Validators.compose([
                    Validators.required,
                    Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+' +
                        '(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]' +
                        '{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'),
                ])],
                [ServicePublishStepFourFormFields.Password]: [data?.password ?? '',
                    Validators.compose([Validators.required, Validators.minLength(6)])],
                [ServicePublishStepFourFormFields.Confirm]: [data?.confirm ?? '',
                    Validators.compose([Validators.required, Validators.minLength(6)])],
            },
            {validators: this.checkPassword});
    }

    public isSubmitDisabled(): boolean {
        return !(this.form.valid && this.form.dirty);
    }

    private checkPassword(group: FormGroup): any {
        if (group.get(ServicePublishStepFourFormFields.Password).value !== group.get(ServicePublishStepFourFormFields.Confirm).value) {
            group.get(ServicePublishStepFourFormFields.Confirm).setErrors({passwordMismatch: true});
        } else {
            return null;
        }
    }
}
