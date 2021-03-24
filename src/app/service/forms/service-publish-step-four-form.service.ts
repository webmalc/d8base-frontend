import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
          Validators.email,
        ])],
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

  public setControlDisabled(val: boolean, controlName: string): void {
    const control = this.form.controls[controlName] as FormControl;
    val ? control.disable() : control.enable();
  }

  public isEmailValid(): boolean {
    return this.form.controls[ServicePublishStepFourFormFields.Email].valid;
  }

  public isSubmitDisabled(): boolean {
    return !(this.form.valid && this.form.dirty);
  }
}
