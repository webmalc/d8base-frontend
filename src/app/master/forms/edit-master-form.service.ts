import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Master} from '@app/core/models/master';
import {EditMasterFormFields} from '@app/master/enums/edit-master-form-fields';

@Injectable()
export class EditMasterFormService {

    public form: FormGroup;
    public levelOptions = ['junior', 'middle', 'senior'];

    constructor(private formBuilder: FormBuilder) {
    }

    public createForm(master?: Master): FormGroup {
        return this.form = this.formBuilder.group({
            [EditMasterFormFields.Name]: [
                master?.name, [
                    Validators.required
                ]
            ],
            [EditMasterFormFields.Description]: [
                master?.description, []
            ],
            [EditMasterFormFields.Company]: [
                master?.company, []
            ],
            [EditMasterFormFields.Experience]: [
                master?.experience, []
            ],
            [EditMasterFormFields.Level]: [
                master?.level, []
            ],
            [EditMasterFormFields.Subcategory]: [
                master?.subcategory, [
                    Validators.required
                ]
            ],
            [EditMasterFormFields.IsAutoOrderConfirmation]: [
                master?.is_auto_order_confirmation
            ]
        });
    }

    public isSubmitDisabled(): boolean {
        return this.form.invalid || !this.form.dirty;
    }
}
