import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResetPasswordFields} from '@app/auth/enums/reset-password-fields';

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordFormService {

    public form: FormGroup;

    constructor(private readonly builder: FormBuilder) {
    }

    public initForm(): void {
        this.form = this.builder.group({
            [ResetPasswordFields.Password]: ['', Validators.required],
            [ResetPasswordFields.Confirm]: ['', Validators.required]
        },
            {validators: this.checkPassword});
    }

    private checkPassword(group: FormGroup): any {
        if (group.get(ResetPasswordFields.Password).value !== group.get(ResetPasswordFields.Confirm).value) {
            group.get(ResetPasswordFields.Confirm).setErrors({passwordMismatch: true});
        } else {
            return null;
        }
    }

}
