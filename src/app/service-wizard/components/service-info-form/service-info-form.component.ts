import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as AppValidators from '@app/core/validators';
import { ServiceInfoFormFields } from '../../enums/service-info.form-fields';

@Component({
  selector: 'app-service-info-form',
  templateUrl: './service-info-form.component.html',
  styleUrls: ['./service-info-form.component.scss'],
})
export class ServiceInfoFormComponent {
  public formFields = ServiceInfoFormFields;
  public form: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  public createForm(): FormGroup {
    this.form = this.fb.group({
      [this.formFields.name]: [null, Validators.required],
      [this.formFields.duration]: [null, Validators.required],
      [this.formFields.price]: [null, [AppValidators.price, AppValidators.paymentMethods]],
    });

    return this.form;
  }
}
