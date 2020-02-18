import {Component, OnInit} from '@angular/core';
import {PasswordRecoveryFormFields} from '@app/auth/enums/password-recovery-form-fields';
import {PasswordRecoveryFormService} from '@app/auth/forms/password-recovery-form.service';
import {PasswordRecoveryService} from '@app/auth/services/password-recovery.service';

@Component({
    selector: 'app-password-recovery-form',
    templateUrl: './password-recovery-form.component.html',
    styleUrls: ['./password-recovery-form.component.scss'],
})
export class PasswordRecoveryFormComponent implements OnInit {

    private readonly formFields = PasswordRecoveryFormFields;

    constructor(
        private readonly formService: PasswordRecoveryFormService,
        private readonly passwordRecoveryService: PasswordRecoveryService
    ) {
    }

     public ngOnInit(): void {
        this.formService.initForm();
    }

    public recover(): any {
        const data = this.formService.form.getRawValue();
        console.log(data);
        this.passwordRecoveryService.recover(data);
    }
}
