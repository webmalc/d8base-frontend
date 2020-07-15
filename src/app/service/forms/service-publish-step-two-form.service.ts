import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServicePublishStepTwoFormFields} from '@app/service/enums/service-publish-step-two-form-fields';
import {StepTwoDataInterface} from '@app/service/interfaces/step-two-data-interface';

@Injectable()
export class ServicePublishStepTwoFormService {

    public form: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    public createForm(data?: StepTwoDataInterface): void {
        this.form = this.formBuilder.group({
                [ServicePublishStepTwoFormFields.Name]: [data?.name, Validators.required],
                [ServicePublishStepTwoFormFields.Description]: [data?.description],
                [ServicePublishStepTwoFormFields.DurationHours]: [data?.duration_hours, Validators.required],
                [ServicePublishStepTwoFormFields.DurationMinutes]: [data?.duration_minutes, Validators.required],
                [ServicePublishStepTwoFormFields.IsPriceFixed]: [data?.is_price_fixed ?? true],
                [ServicePublishStepTwoFormFields.FixedPrice]: [data?.price],
                [ServicePublishStepTwoFormFields.StartPrice]: [data?.start_price],
                [ServicePublishStepTwoFormFields.EndPrice]: [data?.end_price],
                [ServicePublishStepTwoFormFields.Location]: [data?.location, Validators.required],
            },
            {validators: [this.checkPricesValidator, this.fixedPriceValidator]}
        );
    }

    public isSubmitDisabled(): boolean {
        return !(this.form.valid && this.form.dirty);
    }

    private fixedPriceValidator(group: FormGroup): any {
        if (group.get(ServicePublishStepTwoFormFields.IsPriceFixed).value &&
            group.get(ServicePublishStepTwoFormFields.FixedPrice).value === null) {
            group.get(ServicePublishStepTwoFormFields.FixedPrice).setErrors({priceError: true});
        }
        if (!group.get(ServicePublishStepTwoFormFields.IsPriceFixed).value &&
            group.get(ServicePublishStepTwoFormFields.StartPrice).value === null) {
            group.get(ServicePublishStepTwoFormFields.StartPrice).setErrors({priceError: true});
        }
        if (!group.get(ServicePublishStepTwoFormFields.IsPriceFixed).value &&
            group.get(ServicePublishStepTwoFormFields.EndPrice).value === null) {
            group.get(ServicePublishStepTwoFormFields.EndPrice).setErrors({priceError: true});
        }
    }

    private checkPricesValidator(group: FormGroup): any {
        const startPrice = parseInt(group.get(ServicePublishStepTwoFormFields.StartPrice).value, 10);
        const endPrice = parseInt(group.get(ServicePublishStepTwoFormFields.EndPrice).value, 10);
        if (startPrice > endPrice) {
            group.get(ServicePublishStepTwoFormFields.EndPrice).setErrors({priceError: true});
        } else {
            return null;
        }
    }
}
