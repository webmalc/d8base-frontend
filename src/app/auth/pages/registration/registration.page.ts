import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultRegisterUser, Profile, UserLocation } from '@app/api/models';
import { RegistrationService } from '@app/auth/services/registration.service';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {

  @Select(CurrentUserSelectors.errors)
  public errorMessages$: Observable<string[]>;

  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<Profile>;

  constructor(private readonly registrationService: RegistrationService, private readonly router: Router) {
    this.profile$.pipe(
      first(x => !!x),
    ).subscribe(() => this.router.navigateByUrl('/profile'));
  }

  public onSubmitRegistrationForm(data: { user: DefaultRegisterUser; location: UserLocation }): void {
    this.registrationService.register(data.user, { location: data.location });
  }
}
