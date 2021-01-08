import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors} from '@angular/forms';
import {ResetPasswordFields} from '@app/auth/enums/reset-password-fields';
import {passwordValidators} from '@app/core/validators/password-validators';

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordFormService {

    public form: FormGroup;

    constructor(private readonly builder: FormBuilder) {
    }

    public initForm(): void {
        this.form = this.builder.group({
                [ResetPasswordFields.Password]: ['', passwordValidators],
                [ResetPasswordFields.Confirm]: ['', passwordValidators]
            },
            {validators: this.checkPassword});
    }

    private checkPassword(group: FormGroup): ValidationErrors | null {
        if (group.get(ResetPasswordFields.Password).value !== group.get(ResetPasswordFields.Confirm).value) {
            group.get(ResetPasswordFields.Confirm).setErrors({passwordMismatch: true});

            return {passwordMismatch: true};
        }

        return null;
    }

}
