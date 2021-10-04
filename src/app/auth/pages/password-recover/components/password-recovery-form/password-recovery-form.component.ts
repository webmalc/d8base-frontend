import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordRecoveryService } from '@app/auth/pages/password-recover/services/password-recovery.service';
import { getErrorListFromHttpErrorResponse } from '@app/core/functions/http.functions';
import * as AppValidators from '@app/core/validators';
import { PasswordRecoveryFormFields } from './password-recovery-form-fields';

@Component({
  selector: 'app-password-recovery-form',
  templateUrl: './password-recovery-form.component.html',
  styleUrls: ['./password-recovery-form.component.scss'],
})
export class PasswordRecoveryFormComponent implements OnInit {
  public errorMessages: string[];
  public successMessages: string[];
  public readonly formFields = PasswordRecoveryFormFields;
  public form: FormGroup;

  constructor(
    private readonly passwordRecoveryService: PasswordRecoveryService,
    private readonly builder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public recover(): any {
    this.errorMessages = null;
    this.successMessages = null;
    const email = this.form.getRawValue();
    this.form.reset();
    this.passwordRecoveryService.recover(email).subscribe(
      () => {
        this.successMessages = ['password-recovery.link-sent'];
      },
      (err: HttpErrorResponse) => {
        this.errorMessages = getErrorListFromHttpErrorResponse(err.error);
      },
    );
  }

  private initForm(): void {
    this.form = this.builder.group({
      [PasswordRecoveryFormFields.Login]: ['', Validators.compose([Validators.required, AppValidators.email])],
    });
  }
}
