import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultRegisterUser, UserLocation } from '@app/api/models';
import { AppValidators } from '@app/core/validators/app.validators';
import { confirmPasswordValidator, passwordValidators } from '@app/core/validators/password-validators';
import { RegistrationFormFields } from '../../enums/registration-form-fields';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  public form: FormGroup = this.fb.group(
    {
      [RegistrationFormFields.Email]: ['', [Validators.required, AppValidators.email]],
      [RegistrationFormFields.FirstName]: ['', Validators.required],
      [RegistrationFormFields.LastName]: [''],
      [RegistrationFormFields.Password]: ['', passwordValidators],
      [RegistrationFormFields.Confirm]: ['', passwordValidators],
      [RegistrationFormFields.Country]: [null, Validators.required],
      [RegistrationFormFields.City]: [null, Validators.required],
      [RegistrationFormFields.Phone]: [null],
    },
    { validators: confirmPasswordValidator(RegistrationFormFields.Password, RegistrationFormFields.Confirm) },
  );
  public readonly formFields = RegistrationFormFields;

  @Input()
  public errorMessages: string[];

  @Output()
  public readonly registrationFormData = new EventEmitter<{ user: DefaultRegisterUser; location: UserLocation }>();

  private _pending: boolean = false;

  constructor(private readonly fb: FormBuilder) {}

  public get pending(): boolean {
    return this._pending;
  }

  @Input()
  public set pending(value: boolean) {
    this._pending = value;
    if (value) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public submitRegistrationForm(): void {
    if (this.form.invalid) {
      return;
    }
    const formData: object = this.form.getRawValue();

    const user: DefaultRegisterUser = {
      first_name: formData[this.formFields.FirstName],
      last_name: formData[this.formFields.LastName],
      email: formData[this.formFields.Email],
      password: formData[this.formFields.Password],
      password_confirm: formData[this.formFields.Confirm],
      phone: formData[this.formFields.Phone],
    };
    const location: UserLocation = {
      country: formData[this.formFields.Country].id,
      city: formData[this.formFields.City]?.id,
    };
    this.registrationFormData.emit({ user, location });
  }
}
