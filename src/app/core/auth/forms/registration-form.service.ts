import { Injectable } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationFormFields} from '../enums/registration-form-fields';

@Injectable()
export class RegistrationFormService {

  private _form: FormGroup;

  constructor(private builder: FormBuilder) {
  }

  get form(): FormGroup {
    return this._form;
  }

  public initForm(): void {
    this._form = this.builder.group({
      [RegistrationFormFields.Email]: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      [RegistrationFormFields.Name]: new FormControl(null, Validators.compose([
        // Validators.required
      ])),
      [RegistrationFormFields.Password]: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      [RegistrationFormFields.Confirm]: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      [RegistrationFormFields.Country]: new FormControl(null, Validators.compose([
        // Validators.required
      ])),
      [RegistrationFormFields.City]: new FormControl(null, Validators.compose([
        // Validators.required
      ])),
      [RegistrationFormFields.Phone]: new FormControl(null, Validators.compose([
        // Validators.required
      ])),
    });
  }
}
