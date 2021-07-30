import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResetPasswordFields } from '@app/auth/enums/reset-password-fields';
import * as AppValidators from '@app/core/validators';

@Injectable()
export class ResetPasswordFormService {
  public form: FormGroup;

  constructor(private readonly builder: FormBuilder) {}

  public initForm(): void {
    this.form = this.builder.group(
      {
        [ResetPasswordFields.Password]: ['', AppValidators.passwordValidators],
        [ResetPasswordFields.Confirm]: ['', AppValidators.passwordValidators],
      },
      { validators: AppValidators.confirmPasswordValidator(ResetPasswordFields.Password, ResetPasswordFields.Confirm) },
    );
  }
}
