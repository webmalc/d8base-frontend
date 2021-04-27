import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordRecoveryFormFields } from '@app/auth/enums/password-recovery-form-fields';
import { AppValidators } from '@app/core/validators/app.validators';

@Injectable()
export class PasswordRecoveryFormService {

  public form: FormGroup;

  constructor(private readonly builder: FormBuilder) {
  }

  public initForm(): void {
    this.form = this.builder.group({
      [PasswordRecoveryFormFields.Login]: ['', Validators.compose([
        Validators.required,
        AppValidators.email,
      ])],
    });
  }
}
