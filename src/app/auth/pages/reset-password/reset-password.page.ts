import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordFields } from '@app/auth/enums/reset-password-fields';
import { ResetPasswordFormService } from '@app/auth/forms/reset-password-form.service';
import { ResetPasswordApiService } from '@app/auth/services/reset-password-api.service';
import { getErrorListFromHttpErrorResponse } from '@app/core/functions/http.functions';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  public formFields = ResetPasswordFields;
  public errorMessages: string[];
  public successMessages: string[];

  constructor(
    public formService: ResetPasswordFormService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly api: ResetPasswordApiService,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.formService.initForm();
  }

  public reset(): any {
    this.errorMessages = null;
    this.activatedRoute.queryParams.subscribe(params => {
      this.api
        .reset({
          password: this.formService.form.get(ResetPasswordFields.Password).value,
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
}
