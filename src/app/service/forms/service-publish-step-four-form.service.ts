import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ServicePublishStepFourFormFields} from '@app/service/enums/service-publish-step-four-form-fields';

@Injectable()
export class ServicePublishStepFourFormService {

    public form: FormGroup;

    constructor(private readonly formBuilder: FormBuilder) {
    }

    public createForm(): void {
        this.form = this.formBuilder.group({
                [ServicePublishStepFourFormFields.Email]: [null, Validators.compose([
                    Validators.required,
                    Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+' +
                        '(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]' +
                        '{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')
                ])],
                [ServicePublishStepFourFormFields.Password]: [null,
                    Validators.compose([Validators.required, Validators.minLength(8)])],
                [ServicePublishStepFourFormFields.Confirm]: [null,
                    Validators.compose([Validators.required, Validators.minLength(8)])],
                [ServicePublishStepFourFormFields.Country]: [null, Validators.required],
                [ServicePublishStepFourFormFields.City]: [null, Validators.required]
            },
            {validators: this.checkPassword});
    }

    public getFormFieldValue(formField: string): any {
        return this.form?.get(formField)?.value;
    }

    public setControlDisabled(val: boolean, controlName: string): void {
        const control = this.form.controls[controlName] as FormControl;
        val ? control.disable() : control.enable();
    }

    public isEmailValid(): boolean {
        return this.form.controls[ServicePublishStepFourFormFields.Email].valid;
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
