import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { confirmPasswordValidator, passwordValidators } from '@app/core/validators/password-validators';
import { RegistrationFormFields } from '../enums/registration-form-fields';

@Injectable()
export class RegistrationFormService {
  private _form: FormGroup;

  constructor(private readonly builder: FormBuilder) {}

  public get form(): FormGroup {
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
    this._form = this.builder.group(
      {
        [RegistrationFormFields.Email]: ['', Validators.compose([Validators.required, Validators.email])],
        [RegistrationFormFields.Name]: ['', Validators.required],
        [RegistrationFormFields.Password]: ['', passwordValidators],
        [RegistrationFormFields.Confirm]: ['', passwordValidators],
        [RegistrationFormFields.Country]: ['', Validators.required],
        [RegistrationFormFields.City]: [''],
        [RegistrationFormFields.Phone]: [''],
      },
      { validators: confirmPasswordValidator(RegistrationFormFields.Password, RegistrationFormFields.Confirm) },
    );
  }

  public getFormFieldValue(formField: string): any {
    return this.form.get(formField).value;
  }

  public setFormFiledValue(formField: string, value: any): void {
    this.form.get(formField).setValue(value);
  }
}
