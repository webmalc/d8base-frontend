import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ServicePublishStepSevenFormFields} from '@app/service/enums/service-publish-step-seven-form-fields';
import {StepSevenDataInterface} from '@app/service/interfaces/step-seven-data-interface';

@Injectable()
export class ServicePublishStepSevenFormService {

    public form: FormGroup;

    constructor(private readonly formBuilder: FormBuilder) {
    }

    public createForm(data?: StepSevenDataInterface): void {
        this.form = this.formBuilder.group({
            [ServicePublishStepSevenFormFields.Country]: [data?.country, Validators.required],
            [ServicePublishStepSevenFormFields.City]: [data?.city, Validators.required],
            [ServicePublishStepSevenFormFields.Address]: [data?.address],
            [ServicePublishStepSevenFormFields.Postal]: [data?.postal_code],
            [ServicePublishStepSevenFormFields.PaymentCash]: [data?.payment_cash ?? false],
            [ServicePublishStepSevenFormFields.PaymentOnline]: [data?.payment_online ?? false],
            [ServicePublishStepSevenFormFields.UseMasterSchedule]: [data?.use_master_schedule ?? false]
        });
    }

    public getFormFieldValue(formField: string): any {
        return this.form?.get(formField)?.value;
    }

    public setControlDisabled(val: boolean, controlName: string): void {
        const control = this.form.controls[controlName] as FormControl;
        val ? control.disable() : control.enable();
    }
}
