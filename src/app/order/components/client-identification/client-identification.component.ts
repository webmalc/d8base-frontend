import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from '@app/api/models';
import { RegistrationService } from '@app/auth/services/registration.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { IsUserRegisteredApiService } from '@app/core/services/is-user-registered-api.service';
import { AppValidators } from '@app/core/validators/app.validators';
import { confirmPasswordValidator, passwordValidators } from '@app/core/validators/password-validators';
import StepContext from '@app/order/interfaces/step-context.interface';
import { OrderWizardStateService } from '@app/order/services';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-client-identification',
  templateUrl: './client-identification.component.html',
  styleUrls: ['./client-identification.component.scss'],
})
export class ClientIdentificationComponent {
  public context$: Observable<StepContext> = this.wizardState.getContext();
  public email = new FormControl('', Validators.compose([Validators.required, AppValidators.email]));
  public password = new FormControl({ value: '', disabled: true }, passwordValidators);
  public passwordConfirm = new FormControl({ value: '', disabled: true }, passwordValidators);
  public name = new FormControl({ value: '', disabled: true }, Validators.required);
  public lastName = new FormControl({ value: '', disabled: true });
  public country = new FormControl({ value: '', disabled: true }, Validators.required);
  public form = new FormGroup({
    email: this.email,
    password: this.password,
    passwordConfirm: this.passwordConfirm,
    name: this.name,
    lastName: this.lastName,
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
  ) {
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    if (!this.showRegistrationForm) {
      this.registrationChecker.isEmailRegistered(this.email.value).subscribe(isRegistered => {
        this.email.disable();
        this.showRegistrationForm = true;
        this.isRegistered = isRegistered;
        if (!isRegistered) {
          this.form.controls.password.enable();
          this.form.controls.passwordConfirm.enable();
          this.form.controls.name.enable();
          this.form.controls.lastName.enable();
          this.form.controls.country.enable();
        }
      });

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
        last_name: this.lastName.value,
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
      first(profile => !!profile?.account_type),
    ).subscribe(() => this.wizardState.nextStep());
  }

  public reset(): void {
    this.showRegistrationForm = false;
    this.form.reset();
    this.form.controls.lastName.setValue(''); // can't be null
    this.form.controls.password.disable();
    this.form.controls.passwordConfirm.disable();
    this.form.controls.name.disable();
    this.form.controls.lastName.disable();
    this.form.controls.country.disable();
    this.email.enable();
  }
}
