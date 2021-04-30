import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerifyEmail } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import * as CurrentUserActions from '@app/store/current-user/current-user.actions';
import { Store } from '@ngxs/store';
import { switchMap, takeUntil } from 'rxjs/operators';

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
    private readonly store: Store,
    private readonly destroy$: NgDestroyService,
    private readonly cd: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((params: VerifyEmail) => {
          this.setLoading();
          this.newEmail = params?.email;
          return this.store.dispatch(new CurrentUserActions.VerifyEmailAction(params));
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: () => {
          this.success = true;
          this.resetLoading();
          this.cd.markForCheck();
        },
        error: () => {
          this.success = false;
          this.resetLoading();
          this.cd.markForCheck();
        },
      });
  }

  private setLoading(): void {
    this.isLoading = true;
  }

  private resetLoading(): void {
    this.isLoading = false;
  }
}
