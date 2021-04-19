import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultRegisterUser, UserLocation } from '@app/api/models';
import * as CurrentUserActions from '@app/store/current-user/current-user.actions';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {

  @Select(CurrentUserSelectors.errors)
  public errorMessages$: Observable<string[]>;

  public readonly pending$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly store: Store, private readonly router: Router) {}

  public onSubmitRegistrationForm(data: { user: DefaultRegisterUser; location: UserLocation }): void {
    this.pending$.next(true);
    this.store.dispatch(new CurrentUserActions.Register(data.user, { location: data.location }))
      .subscribe(
        () => this.router.navigateByUrl('/profile'),
        () => this.pending$.next(false),
        () => this.pending$.next(false),
      );
  }
}
