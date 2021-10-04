import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '@app/api/models';
import { Credentials } from '@app/core/interfaces/credentials';
import { NgDestroyService } from '@app/core/services';
import { AuthenticationService } from '@app/core/services/authentication.service';
import * as CurrentUserActions from '@app/store/current-user/current-user.actions';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [NgDestroyService],
})
export class LoginPage {
  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<Profile>;

  @Select(CurrentUserSelectors.errors)
  public errorMessages$: Observable<string[]>;

  public readonly pending$ = new BehaviorSubject<boolean>(false);

  private redirectTo: string = '/profile';

  constructor(
    private readonly authenticator: AuthenticationService,
    private readonly router: Router,
    private readonly destroy$: NgDestroyService,
    private readonly route: ActivatedRoute,
    private readonly store: Store,
  ) {
    this.subOnQueryParams();
  }

  public onSubmitLoginForm(user: Credentials): void {
    this.pending$.next(true);
    this.store.dispatch(new CurrentUserActions.Login(user)).subscribe(
      () => this.router.navigateByUrl(this.redirectTo),
      () => this.pending$.next(false),
      () => this.pending$.next(false),
    );
  }

  private async logout(): Promise<void> {
    this.authenticator.logout();
    await this.router.navigateByUrl('/auth/login');
  }

  private subOnQueryParams(): void {
    this.route.queryParams
      .pipe(
        filter(params => params?.hasOwnProperty('logout')),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.logout());

    this.route.queryParams
      .pipe(
        filter(params => params?.hasOwnProperty('redirectTo')),
        takeUntil(this.destroy$),
      )
      .subscribe(({ redirectTo }) => {
        this.redirectTo = decodeURIComponent(redirectTo);
      });
  }
}
