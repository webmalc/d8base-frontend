import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginFormFields} from '../enums/login-form-fields';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService {

  private _form: FormGroup;

  constructor() {
  }

  get form(): FormGroup {
    return this._form;
  }

  public initForm(): void {
    this._form = new FormGroup({
      [LoginFormFields.Username]: new FormControl(null, Validators.compose([
          Validators.required
      ])),
      [LoginFormFields.Password]: new FormControl(null, Validators.compose([
          Validators.required
      ]))
    });
  }
}
