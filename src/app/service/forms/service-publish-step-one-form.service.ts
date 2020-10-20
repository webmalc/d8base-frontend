import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '@app/core/models/category';
import {Subcategory} from '@app/core/models/subcategory';
import {ServicePublishStepOneFormFields} from '@app/service/enums/service-publish-step-one-form-fields';

@Injectable()
export class ServicePublishStepOneFormService {

    public form: FormGroup;

    constructor(private readonly formBuilder: FormBuilder) { }

    public createForm(category?: Category, subcategory?: Subcategory): void {
        this.form = this.formBuilder.group({
            [ServicePublishStepOneFormFields.Category]: [category ?? '', Validators.required],
            [ServicePublishStepOneFormFields.Subcategory]: [subcategory ?? '', Validators.required],
        });
    }
}
