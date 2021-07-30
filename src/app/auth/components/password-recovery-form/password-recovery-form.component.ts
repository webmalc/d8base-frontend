import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PasswordRecoveryFormFields } from '@app/auth/enums/password-recovery-form-fields';
import { PasswordRecoveryFormService } from '@app/auth/forms/password-recovery-form.service';
import { PasswordRecoveryService } from '@app/auth/services/password-recovery.service';
import { getErrorListFromHttpErrorResponse } from '@app/core/functions/http.functions';

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
  ) {}

  public ngOnInit(): void {
    this.formService.initForm();
  }

  public recover(): any {
    this.errorMessages = null;
    this.successMessages = null;
    const email = this.formService.form.getRawValue();
    this.formService.form.reset();
    this.passwordRecoveryService.recover(email).subscribe(
      () => {
        this.successMessages = ['password-recovery.link-sent'];
      },
      (err: HttpErrorResponse) => {
        this.errorMessages = getErrorListFromHttpErrorResponse(err.error);
      },
    );
  }
}
