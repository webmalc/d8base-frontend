import { Injectable } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginFormFields} from '../enums/login-form-fields';

@Injectable()
export class LoginFormService {

  private _form: FormGroup;

  constructor(private builder: FormBuilder) {
  }

  get form(): FormGroup {
    return this._form;
  }

  public initForm(): void {
    this._form = this.builder.group({
      [LoginFormFields.Username]: new FormControl(null, Validators.compose([
          Validators.required
      ])),
      [LoginFormFields.Password]: new FormControl(null, Validators.compose([
          Validators.required
      ]))
    });
  }
}
