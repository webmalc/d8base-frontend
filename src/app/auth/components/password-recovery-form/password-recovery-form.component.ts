import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PasswordRecoveryFormFields } from '@app/auth/enums/password-recovery-form-fields';
import { PasswordRecoveryFormService } from '@app/auth/forms/password-recovery-form.service';
import { PasswordRecoveryService } from '@app/auth/services/password-recovery.service';
import { HelperService } from '@app/core/services/helper.service';

@Component({
    selector: 'app-password-recovery-form',
    templateUrl: './password-recovery-form.component.html',
    styleUrls: ['./password-recovery-form.component.scss'],
})
export class PasswordRecoveryFormComponent implements OnInit {

    public errorMessages: string[];
    public successMessages: string[];
    public readonly formFields = PasswordRecoveryFormFields;

    constructor(
        public readonly formService: PasswordRecoveryFormService,
        private readonly passwordRecoveryService: PasswordRecoveryService,
    ) {
    }

     public ngOnInit(): void {
        this.formService.initForm();
    }

    public recover(): any {
        this.errorMessages = null;
        this.successMessages = null;
        this.passwordRecoveryService.recover(this.formService.form.getRawValue()).subscribe(
            next => this.successMessages = ['password-recovery.link-sent'],
            (err: HttpErrorResponse) => this.errorMessages = HelperService.getErrorListFromHttpErrorResponse(err.error),
        );
    }
}
