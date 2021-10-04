import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordApiService } from '@app/auth/pages/reset-password/services/reset-password-api.service';
import { getErrorListFromHttpErrorResponse } from '@app/core/functions/http.functions';
import { delay, tap } from 'rxjs/operators';
import * as AppValidators from '@app/core/validators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResetPasswordFields } from './reset-password-fields';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  public formFields = ResetPasswordFields;
  public errorMessages: string[];
  public successMessages: string[];
  public form: FormGroup;

  constructor(
    private readonly builder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly api: ResetPasswordApiService,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public reset(): any {
    this.errorMessages = null;
    this.activatedRoute.queryParams.subscribe(params => {
      this.api
        .reset({
          password: this.form.get(ResetPasswordFields.Password).value,
          user_id: params.user_id,
          timestamp: params.timestamp,
          signature: params.signature,
        })
        .pipe(
          tap(() => (this.successMessages = ['reset-password.success'])),
          delay(800),
        )
        .subscribe(
          () => this.router.navigateByUrl('/auth/login'),
          (error: HttpErrorResponse) => (this.errorMessages = getErrorListFromHttpErrorResponse(error.error)),
        );
    });
  }

  private initForm(): void {
    this.form = this.builder.group(
      {
        [ResetPasswordFields.Password]: ['', AppValidators.passwordValidators],
        [ResetPasswordFields.Confirm]: ['', AppValidators.passwordValidators],
      },
      { validators: AppValidators.confirmPasswordValidator(ResetPasswordFields.Password, ResetPasswordFields.Confirm) },
    );
  }
}
