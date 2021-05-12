import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppValidators } from '@app/core/validators/app.validators';
import { confirmPasswordValidator, passwordValidators } from '@app/core/validators/password-validators';
import { ServicePublishStepFourFormFields } from '@app/service/enums/service-publish-step-four-form-fields';

@Injectable()
export class ServicePublishStepFourFormService {

  public form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
  }

  public createForm(): void {
    this.form = this.formBuilder.group({
        [ServicePublishStepFourFormFields.Email]: [null, Validators.compose([
          Validators.required,
          AppValidators.email,
        ])],
        [ServicePublishStepFourFormFields.FirstName]: [null, Validators.required],
        [ServicePublishStepFourFormFields.LastName]: [''],
        [ServicePublishStepFourFormFields.Password]: [null, passwordValidators],
        [ServicePublishStepFourFormFields.Confirm]: [null, passwordValidators],
        [ServicePublishStepFourFormFields.Country]: [null, Validators.required],
        [ServicePublishStepFourFormFields.City]: [{ value: null, disabled: true }, Validators.required],
      },
      { validators: confirmPasswordValidator(ServicePublishStepFourFormFields.Password, ServicePublishStepFourFormFields.Confirm) });
  }

  public getFormFieldValue(formField: string): any {
    return this.form?.get(formField)?.value;
  }

  public isEmailValid(): boolean {
    return this.form.controls[ServicePublishStepFourFormFields.Email].valid;
  }

  public isSubmitDisabled(): boolean {
    return !(this.form.valid && this.form.dirty);
  }
}
