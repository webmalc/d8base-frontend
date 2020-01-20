import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordRecoveryFormFields} from '@app/auth/enums/password-recovery-form-fields';

@Injectable()
export class PasswordRecoveryFormService {

    private _form: FormGroup;

    constructor(private builder: FormBuilder) {
    }

    get form(): FormGroup {
        return this._form;
    }

    public initForm(): void {
        this._form = this.builder.group({
            [PasswordRecoveryFormFields.Email]: new FormControl(null, Validators.compose([
                Validators.required,
                Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+' +
                    '(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]' +
                    '{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'),
            ]))
        });
    }
}
