import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '@app/api/models';
import { Credentials } from '@app/auth/interfaces/credentials';
import { NgDestroyService } from '@app/core/services';
import { AuthenticationService } from '@app/core/services/authentication.service';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
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

  private redirectTo: string = '/profile';

  constructor(
    private readonly authenticator: AuthenticationService,
    private readonly router: Router,
    private readonly destroy$: NgDestroyService,
    private readonly route: ActivatedRoute,
  ) {
    this.subOnQueryParams();
    this.subOnProfile();
  }

  public onSubmitLoginForm(user: Credentials): void {
    this.authenticator.login(user);
  }

  private async logout(): Promise<void> {
    this.authenticator.logout();
    await this.router.navigateByUrl('/auth/login');
  }

  private subOnQueryParams() {
    this.route.queryParams.pipe(
      filter(params => params?.hasOwnProperty('logout')),
      takeUntil(this.destroy$),
    ).subscribe(() => this.logout());

    this.route.queryParams
    .pipe(
        filter(params => params?.hasOwnProperty('redirectTo')),
        takeUntil(this.destroy$),
    )
    .subscribe(({ redirectTo }) => {
        this.redirectTo = redirectTo;
    });
  }

  private subOnProfile() {
    this.profile$.pipe(
      filter(x => !!x),
      takeUntil(this.destroy$),
    ).subscribe(() => this.router.navigateByUrl(this.redirectTo));
  }
}
