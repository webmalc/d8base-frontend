import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '@app/core/models/category';
import {Subcategory} from '@app/core/models/subcategory';
import {ServicePublishStepOneFormFields} from '@app/service/enums/service-publish-step-one-form-fields';

@Injectable()
export class ServicePublishStepOneFormService {

    public form: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    public createForm(): void {
        this.form = this.formBuilder.group({
            [ServicePublishStepOneFormFields.Category]: ['', Validators.required],
            [ServicePublishStepOneFormFields.Subcategory]: ['', Validators.required],
        });
    }

    public fillForm(category: Category, subcategory: Subcategory): void {
        this.form.get(ServicePublishStepOneFormFields.Category).setValue(category);
        this.form.get(ServicePublishStepOneFormFields.Subcategory).setValue(subcategory);
    }
}
