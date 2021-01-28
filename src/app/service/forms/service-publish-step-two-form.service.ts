import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Price } from '@app/api/models';
import { minimumDescriptionLength } from '@app/core/constants/service.constants';
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
        [ServicePublishStepTwoFormFields.Description]: [data?.description, Validators.minLength(minimumDescriptionLength)],
        [ServicePublishStepTwoFormFields.Duration]: [data?.duration, Validators.required],
        [ServicePublishStepTwoFormFields.Price]: [data?.price],
        [ServicePublishStepTwoFormFields.Location]: [data?.service_type, Validators.required],
      },
      { validators: [this.checkPricesValidator] },
    );
  }

  public isSubmitDisabled(): boolean {
    return this.form.invalid;
  }

  private checkPricesValidator(group: FormGroup): ValidationErrors | null {
    const startPrice = 1;
    const endPrice = 2;
    if (startPrice > endPrice) {
      return { priceError: true };
    }

    return null;
  }
}
