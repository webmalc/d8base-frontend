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
        Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+' +
          '(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]' +
          '{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'),
      ])],
    });
  }
}
