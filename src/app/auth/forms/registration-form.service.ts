import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {passwordValidators} from '@app/core/validators/password-validators';
import {RegistrationFormFields} from '../enums/registration-form-fields';

@Injectable()
export class RegistrationFormService {

    // tslint:disable-next-line:variable-name
    private _form: FormGroup;

    constructor(private readonly builder: FormBuilder) {
    }

    get form(): FormGroup {
        return this._form;
    }

    public setCityDisabled(value: boolean): void {
        const control = this.form.controls[RegistrationFormFields.City] as FormControl;
        value ? control.disable() : control.enable();
    }

    public isFormInvalid(): boolean {
        return this.form.invalid;
    }

    public getErrors(fieldName: string): ValidationErrors {
        return this.form.get(fieldName).dirty ? this.form.get(fieldName).errors : null;
    }

    public initForm(): void {
        this._form = this.builder.group({
                [RegistrationFormFields.Email]: ['', Validators.compose([
                    Validators.required,
                    Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+' +
                        '(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]' +
                        '{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')
                ])],
                [RegistrationFormFields.Name]: ['', Validators.required],
                [RegistrationFormFields.Password]: ['', passwordValidators],
                [RegistrationFormFields.Confirm]: ['', passwordValidators],
                [RegistrationFormFields.Country]: ['', Validators.required],
                [RegistrationFormFields.City]: [''],
                [RegistrationFormFields.Phone]: ['']
            },
            {validators: this.checkPassword}
        );
    }

    public getFormFieldValue(formField: string): any {
        return this.form.get(formField).value;
    }

    public setFormFiledValue(formField: string, value: any): void {
        this.form.get(formField).setValue(value);
    }

    private checkPassword(group: FormGroup): any {
        if (group.get(RegistrationFormFields.Password).value !== group.get(RegistrationFormFields.Confirm).value) {
            group.get(RegistrationFormFields.Confirm).setErrors({passwordMismatch: true});
        } else {
            return null;
        }
    }
}
