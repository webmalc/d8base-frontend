import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginFormFields} from '../enums/login-form-fields';

@Injectable()
export class LoginFormService {

    // tslint:disable-next-line:variable-name
    private _form: FormGroup;

    constructor(private readonly builder: FormBuilder) {
    }

    get form(): FormGroup {
        return this._form;
    }

    public isFormValid(): boolean {
        return !this.form.valid;
    }

    public initForm(): void {
        this._form = this.builder.group({
            [LoginFormFields.Username]: ['', Validators.required],
            [LoginFormFields.Password]: ['', Validators.required]
        });
    }
}
