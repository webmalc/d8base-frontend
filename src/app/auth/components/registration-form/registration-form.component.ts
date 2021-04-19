import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultRegisterUser, UserLocation } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import { confirmPasswordValidator, passwordValidators } from '@app/core/validators/password-validators';
import { takeUntil } from 'rxjs/operators';
import { RegistrationFormFields } from '../../enums/registration-form-fields';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  providers: [NgDestroyService],
})
export class RegistrationFormComponent {
  public form: FormGroup = this.fb.group(
    {
      [RegistrationFormFields.Email]: ['', [Validators.required, Validators.email]],
      [RegistrationFormFields.FirstName]: ['', Validators.required],
      [RegistrationFormFields.LastName]: [''],
      [RegistrationFormFields.Password]: ['', passwordValidators],
      [RegistrationFormFields.Confirm]: ['', passwordValidators],
      [RegistrationFormFields.Country]: ['', Validators.required],
      [RegistrationFormFields.City]: [{ value: '', disabled: true }],
      [RegistrationFormFields.Phone]: [''],
    },
    { validators: confirmPasswordValidator(RegistrationFormFields.Password, RegistrationFormFields.Confirm) },
  );
  public readonly formFields = RegistrationFormFields;

  @Input()
  public errorMessages: string[];

  @Output()
  public readonly registrationFormData = new EventEmitter<{ user: DefaultRegisterUser; location: UserLocation }>();

  private _pending: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly $ngDestroy: NgDestroyService,
  ) {
    this.subscribeOnCountryChanges();
  }

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

  private subscribeOnCountryChanges() {
    this.form.get(this.formFields.Country).valueChanges
      .pipe(
        takeUntil(this.$ngDestroy),
      )
      .subscribe(value => this.onCountryChange(value));
  }

  private onCountryChange(value: any): void {
    this.setCityDisabled(!value);
    this.form.get(this.formFields.City).setValue(null);
  }

  private setCityDisabled(value: boolean = true): void {
    const control = this.form.get(this.formFields.City);
    if (value) {
      control.disable();
    } else {
      control.enable();
    }
  }
}
