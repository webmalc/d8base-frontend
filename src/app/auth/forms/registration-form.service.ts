import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegistrationFormFields} from '../enums/registration-form-fields';

@Injectable()
export class RegistrationFormService {

    // tslint:disable-next-line:variable-name
    private _form: FormGroup;

    constructor(private builder: FormBuilder) {
    }

    get form(): FormGroup {
        return this._form;
    }

    public isFormValid(): boolean {
        return !this.form.valid;
    }

    public initForm(): void {
        this._form = this.builder.group({
                [RegistrationFormFields.Email]: ['', Validators.compose([
                    Validators.required,
                    Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+' +
                        '(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]' +
                        '{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'),
                ])],
                [RegistrationFormFields.Name]: ['', Validators.required],
                [RegistrationFormFields.Password]: ['', Validators.required],
                [RegistrationFormFields.Confirm]: ['', Validators.required],
                [RegistrationFormFields.Country]: [''],
                [RegistrationFormFields.City]: [''],
                [RegistrationFormFields.Phone]: [''],
            },
            {validators: this.checkPassword}
        );
    }

    private checkPassword(group: FormGroup): any {
        if (group.get(RegistrationFormFields.Password).value !== group.get(RegistrationFormFields.Confirm).value) {
            group.get(RegistrationFormFields.Confirm).setErrors({passwordMismatch: true});
        } else {
            return null;
        }
    }
}
