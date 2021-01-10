import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ServicePublishStepTwoFormFields } from '@app/service/enums/service-publish-step-two-form-fields';
import { StepTwoDataInterface } from '@app/service/interfaces/step-two-data-interface';

@Injectable()
export class ServicePublishStepTwoFormService {

  public form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
  }

  public createForm(data?: StepTwoDataInterface): void {
    this.form = this.formBuilder.group({
        [ServicePublishStepTwoFormFields.Name]: [data?.name, Validators.required],
        [ServicePublishStepTwoFormFields.Description]: [data?.description, Validators.minLength(20)],
        [ServicePublishStepTwoFormFields.Duration]: [data?.duration, Validators.required],
        [ServicePublishStepTwoFormFields.IsPriceFixed]: [data?.is_price_fixed ?? true],
        [ServicePublishStepTwoFormFields.FixedPrice]: [data?.price],
        [ServicePublishStepTwoFormFields.StartPrice]: [data?.start_price],
        [ServicePublishStepTwoFormFields.EndPrice]: [data?.end_price],
        [ServicePublishStepTwoFormFields.Location]: [data?.service_type, Validators.required],
        [ServicePublishStepTwoFormFields.Currency]: [data?.price_currency],
      },
      { validators: [this.checkPricesValidator] },
    );
  }

  public isSubmitDisabled(): boolean {
    return (this.form.invalid || this.currencyValidator(this.form) || this.fixedPriceValidator(this.form));
  }

  private currencyValidator(group: FormGroup): boolean {
    if (group.get(ServicePublishStepTwoFormFields.IsPriceFixed).value &&
      !group.get(ServicePublishStepTwoFormFields.Currency).value) {
      return true;
    }
    if (!group.get(ServicePublishStepTwoFormFields.IsPriceFixed).value &&
      !group.get(ServicePublishStepTwoFormFields.Currency).value) {
      return true;
    }

    return !group.get(ServicePublishStepTwoFormFields.IsPriceFixed).value &&
      !group.get(ServicePublishStepTwoFormFields.Currency).value;
  }

  private fixedPriceValidator(group: FormGroup): boolean {
    if (group.get(ServicePublishStepTwoFormFields.IsPriceFixed).value &&
      !group.get(ServicePublishStepTwoFormFields.FixedPrice).value) {
      return true;
    }
    if (!group.get(ServicePublishStepTwoFormFields.IsPriceFixed).value &&
      !group.get(ServicePublishStepTwoFormFields.StartPrice).value) {
      return true;
    }

    return !group.get(ServicePublishStepTwoFormFields.IsPriceFixed).value &&
      !group.get(ServicePublishStepTwoFormFields.EndPrice).value;
  }

  private checkPricesValidator(group: FormGroup): ValidationErrors | null {
    const startPrice = parseInt(group.get(ServicePublishStepTwoFormFields.StartPrice).value, 10);
    const endPrice = parseInt(group.get(ServicePublishStepTwoFormFields.EndPrice).value, 10);
    if (startPrice > endPrice) {
      group.get(ServicePublishStepTwoFormFields.EndPrice).setErrors({ priceError: true });

      return { priceError: true };
    }

    return null;
  }
}
