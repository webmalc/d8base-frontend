import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerifyEmail } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import * as CurrentUserActions from '@app/store/current-user/current-user.actions';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Actions, ofActionErrored, ofActionSuccessful } from '@ngxs/store';
import { first, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  providers: [NgDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeEmailComponent implements OnInit {
  public success: boolean = false;
  public isLoading: boolean = false;
  public newEmail: VerifyEmail['email'];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly actions$: Actions,
    private readonly destroy$: NgDestroyService,
    private readonly cd: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.actions$.pipe(ofActionErrored(CurrentUserActions.VerifyEmailAction), first()).subscribe(() => {
      this.success = false;
      this.resetLoading();
      this.cd.markForCheck();
    });

    this.actions$
      .pipe(ofActionSuccessful(CurrentUserActions.VerifyEmailAction), first())
      .subscribe((action: CurrentUserActions.VerifyEmailAction) => {
        this.newEmail = action.verifyEmail.email;
        this.success = true;
        this.resetLoading();
        this.cd.markForCheck();
      });

    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params: VerifyEmail) => {
      this.setLoading();
      this.verifyEmail(params);
      this.cd.markForCheck();
    });
  }

  @Dispatch()
  public verifyEmail(verifyEmail: VerifyEmail): CurrentUserActions.VerifyEmailAction {
    return new CurrentUserActions.VerifyEmailAction(verifyEmail);
  }

  private setLoading(): void {
    this.isLoading = true;
  }

  private resetLoading(): void {
    this.isLoading = false;
  }
}
