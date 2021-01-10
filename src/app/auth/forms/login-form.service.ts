import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginFormFields } from '../enums/login-form-fields';

@Injectable()
export class LoginFormService {

  public form: FormGroup;

  constructor(private readonly builder: FormBuilder) {
  }

  public isFormValid(): boolean {
    return !this.form.valid;
  }

  public initForm(): void {
    this.form = this.builder.group({
      [LoginFormFields.Username]: ['', Validators.required],
      [LoginFormFields.Password]: ['', Validators.required],
    });
  }
}
