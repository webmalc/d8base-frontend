import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordRecoveryFormFields } from '@app/auth/enums/password-recovery-form-fields';

@Injectable()
export class PasswordRecoveryFormService {

  public form: FormGroup;

  constructor(private readonly builder: FormBuilder) {
  }

  public initForm(): void {
    this.form = this.builder.group({
      [PasswordRecoveryFormFields.Login]: ['', Validators.compose([
        Validators.required,
        Validators.email,
      ])],
    });
  }
}
