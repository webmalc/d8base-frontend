import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ServicePublishStepSevenFormFields} from '@app/service/enums/service-publish-step-seven-form-fields';
import {StepSevenDataInterface} from '@app/service/interfaces/step-seven-data-interface';

@Injectable()
export class ServicePublishStepSevenFormService {

    public form: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    public createForm(data?: StepSevenDataInterface): void {
        this.form = this.formBuilder.group({
            [ServicePublishStepSevenFormFields.Country]: [data?.country, Validators.required],
            [ServicePublishStepSevenFormFields.City]: [data?.city, Validators.required],
            [ServicePublishStepSevenFormFields.Address]: [data?.address],
            [ServicePublishStepSevenFormFields.Postal]: [data?.postal_code],
            [ServicePublishStepSevenFormFields.PaymentCash]: [data?.payment_cash ?? false],
            [ServicePublishStepSevenFormFields.PaymentOnline]: [data?.payment_online ?? false],
        });
    }

    public getFormFieldValue(formField: string): any {
        return this.form.get(formField).value;
    }

    public isSubmitDisabled(): boolean {
        return (this.form.invalid) ||
        (
            !this.form.get(ServicePublishStepSevenFormFields.PaymentOnline).value &&
            !this.form.get(ServicePublishStepSevenFormFields.PaymentCash).value
        );
    }

    public setCityDisabled(val: boolean): void {
        const control = this.form.controls[ServicePublishStepSevenFormFields.City] as FormControl;
        val ? control.disable() : control.enable();
    }
}
