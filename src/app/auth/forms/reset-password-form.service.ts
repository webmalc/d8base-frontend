import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResetPasswordFields } from '@app/auth/enums/reset-password-fields';
import { confirmPasswordValidator, passwordValidators } from '@app/core/validators/password-validators';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordFormService {
  public form: FormGroup;

  constructor(private readonly builder: FormBuilder) {}

  public initForm(): void {
    this.form = this.builder.group(
      {
        [ResetPasswordFields.Password]: ['', passwordValidators],
        [ResetPasswordFields.Confirm]: ['', passwordValidators],
      },
      { validators: confirmPasswordValidator(ResetPasswordFields.Password, ResetPasswordFields.Confirm) },
    );
  }
}
