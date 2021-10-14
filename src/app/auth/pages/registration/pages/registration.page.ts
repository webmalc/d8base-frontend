import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultRegisterUser, UserLocation } from '@app/api/models';
import { NavPath, NavQueryParams } from '@app/core/constants/navigation.constants';
import { NgDestroyService } from '@app/core/services';
import * as CurrentUserActions from '@app/store/current-user/current-user.actions';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  providers: [NgDestroyService],
})
export class RegistrationPage {
  @Select(CurrentUserSelectors.errors)
  public errorMessages$: Observable<string[]>;

  public readonly pending$ = new BehaviorSubject<boolean>(false);

  private redirectTo: string = NavPath.Profile;

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly destroy$: NgDestroyService,
  ) {
    this.subOnQueryParams();
  }

  public onSubmitRegistrationForm(data: { user: DefaultRegisterUser; location: UserLocation }): void {
    this.pending$.next(true);
    this.store.dispatch(new CurrentUserActions.Register(data.user, { location: data.location })).subscribe(
      () => this.router.navigateByUrl(this.redirectTo),
      () => this.pending$.next(false),
      () => this.pending$.next(false),
    );
  }

  private subOnQueryParams(): void {
    this.route.queryParams
      .pipe(
        filter(params => params?.hasOwnProperty(NavQueryParams.redirectTo)),
        takeUntil(this.destroy$),
      )
      .subscribe(({ redirectTo }) => {
        this.redirectTo = decodeURIComponent(redirectTo);
      });
  }
}
