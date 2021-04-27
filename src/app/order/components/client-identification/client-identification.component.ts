import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from '@app/api/models';
import { RegistrationService } from '@app/auth/services/registration.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { IsUserRegisteredApiService } from '@app/core/services/is-user-registered-api.service';
import { AppValidators } from '@app/core/validators/app.validators';
import { confirmPasswordValidator, passwordValidators } from '@app/core/validators/password-validators';
import { OrderIds } from '@app/order/enums/order-ids.enum';
import StepContext from '@app/order/interfaces/step-context.interface';
import { OrderWizardStateService } from '@app/order/services';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

const NEXT_STEP_ID = OrderIds.Location;

@Component({
  selector: 'app-client-identification',
  templateUrl: './client-identification.component.html',
  styleUrls: ['./client-identification.component.scss'],
})
export class ClientIdentificationComponent {
  public context$: Observable<StepContext> = this.wizardState.getContext();
  public email = new FormControl('', Validators.compose([Validators.required, AppValidators.email]));
  public password = new FormControl('', passwordValidators);
  public passwordConfirm = new FormControl({ value: '', disabled: true }, passwordValidators);
  public name = new FormControl({ value: '', disabled: true }, Validators.required);
  public country = new FormControl({ value: '', disabled: true }, Validators.required);
  public form = new FormGroup({
    email: this.email,
    password: this.password,
    passwordConfirm: this.passwordConfirm,
    name: this.name,
    country: this.country,
  }, confirmPasswordValidator('password', 'passwordConfirm'));
  public isRegistered;
  public showRegistrationForm = false;

  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<Profile>;

  constructor(
    public readonly countrySelectable: SelectableCountryOnSearchService,
    private readonly wizardState: OrderWizardStateService,
    private readonly registrationChecker: IsUserRegisteredApiService,
    private readonly authenticator: AuthenticationService,
    private readonly registrar: RegistrationService,
    private readonly router: Router,
  ) {
  }

  public submit(): void {
    if (!this.showRegistrationForm) {
      this.registrationChecker.isEmailRegistered(this.email.value).subscribe(isRegistered => {
        this.showRegistrationForm = true;
        this.isRegistered = isRegistered;
        if (!isRegistered) {
          this.form.controls.passwordConfirm.enable();
          this.form.controls.name.enable();
          this.form.controls.country.enable();
        }
      });

      return;
    }

    if (this.form.invalid) {
      return;
    }

    if (this.isRegistered) {
      this.authenticator.login({
        username: this.email.value,
        password: this.password.value,
      });
    } else {
      const userData = {
        first_name: this.name.value,
        email: this.email.value,
        password: this.password.value,
        password_confirm: this.passwordConfirm.value,
      };
      const locationData = {
        country: this.country.value.id,
      };
      this.registrar.register(userData, { location: locationData });
    }
    this.profile$.pipe(
      first(x => !!x),
      switchMap(() => this.context$),
    ).subscribe(context =>
      this.router.navigate(['/', 'order', context.service.id, NEXT_STEP_ID]));
  }

  public reset(): void {
    this.showRegistrationForm = false;
    this.form.reset();
    this.form.controls.passwordConfirm.disable();
    this.form.controls.name.disable();
    this.form.controls.country.disable();
  }
}
