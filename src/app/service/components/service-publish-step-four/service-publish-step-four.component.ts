import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City, Country, Profile } from '@app/api/models';
import { RegistrationService } from '@app/auth/services/registration.service';
import { isFormInvalid } from '@app/core/functions/form.functions';
import { NgDestroyService } from '@app/core/services';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { IsUserRegisteredApiService } from '@app/core/services/api/is-user-registered-api.service';
import * as AppValidators from '@app/core/validators';
import { ServicePublishStepFourFormFields } from '@app/service/enums/service-publish-step-four-form-fields';
import { ServiceStepsNavigationService } from '@app/service/services/service-steps-navigation.service';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, first, map, switchMap, takeUntil } from 'rxjs/operators';
import ServicePublishStepFourContext from './service-publish-step-four-context.interface';

const DEBOUNCE_DURATION_MS = 500;

@Component({
  selector: 'app-service-publish-step-four',
  templateUrl: './service-publish-step-four.component.html',
  styleUrls: ['./service-publish-step-four.component.scss'],
  providers: [NgDestroyService],
})
export class ServicePublishStepFourComponent {
  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<Profile>;

  @Select(CurrentUserSelectors.errors)
  public errorMessages$: Observable<string[]>;

  public form: FormGroup;
  public context$: Observable<ServicePublishStepFourContext>;
  public readonly formFields = ServicePublishStepFourFormFields;
  private readonly isUserExists$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly emailChanged$: Subject<void> = new Subject<void>();

  constructor(
    public serviceStepsNavigationService: ServiceStepsNavigationService,
    private readonly formBuilder: FormBuilder,
    private readonly authenticationService: AuthenticationService,
    private readonly isRegisteredApi: IsUserRegisteredApiService,
    private readonly registrationService: RegistrationService,
    private readonly destroy$: NgDestroyService,
  ) {
    this.context$ = combineLatest([authenticationService.isAuthenticated$, this.isUserExists$]).pipe(
      map(([isAuthenticated, isUserExisting]) => ({ isAuthenticated, isUserExisting })),
    );
    this.form = this.createForm();
    this.subscribeOnEmailChanges();
    this.subscribeOnProfile();
  }

  public onEmailChange(): void {
    if (this.isEmailValid()) {
      this.emailChanged$.next();
    }
  }

  public isEmailValid(): boolean {
    return this.form.controls[ServicePublishStepFourFormFields.Email].valid;
  }

  public submitForm(userExists: boolean): void {
    if (isFormInvalid(this.form)) {
      return;
    }

    if (userExists) {
      this.authenticationService.login({
        username: this.form.get(this.formFields.Email).value,
        password: this.form.get(this.formFields.Password).value,
      });
      return;
    }

    const country = this.form.get(this.formFields.Country).value as Country;
    const city = this.form.get(this.formFields.City).value as City;
    this.registrationService.register(
      {
        first_name: this.form.get(this.formFields.FirstName).value,
        last_name: this.form.get(this.formFields.LastName).value,
        email: this.form.get(this.formFields.Email).value,
        password: this.form.get(this.formFields.Password).value,
        password_confirm: this.form.get(this.formFields.Confirm).value,
      },
      {
        location: {
          country: country.id,
          city: city.id,
          is_default: true,
        },
      },
    );
  }

  private createForm(): FormGroup {
    return this.formBuilder.group(
      {
        [this.formFields.Email]: [null, Validators.compose([Validators.required, AppValidators.email])],
        [this.formFields.FirstName]: ['', Validators.required],
        [this.formFields.LastName]: [''],
        [this.formFields.Password]: ['', AppValidators.passwordValidators],
        [this.formFields.Confirm]: ['', AppValidators.passwordValidators],
        [this.formFields.Country]: [null, Validators.required],
        [this.formFields.City]: [null, Validators.required],
      },
      {
        validators: AppValidators.confirmPasswordValidator(
          ServicePublishStepFourFormFields.Password,
          ServicePublishStepFourFormFields.Confirm,
        ),
      },
    );
  }

  private subscribeOnProfile(): void {
    this.profile$
      .pipe(first(profile => !!profile?.account_type))
      .subscribe(() => this.serviceStepsNavigationService.next());
  }

  private subscribeOnEmailChanges(): void {
    this.emailChanged$
      .pipe(
        debounceTime(DEBOUNCE_DURATION_MS),
        switchMap(() => this.isRegisteredApi.isEmailRegistered(this.form.get(this.formFields.Email).value)),
        takeUntil(this.destroy$),
      )
      .subscribe(existingUser => {
        this.isUserExists$.next(existingUser);
        this.switchUserMode(existingUser);
      });
  }

  private switchUserMode(existingUser: boolean): void {
    [
      this.form.controls[this.formFields.FirstName],
      this.form.controls[this.formFields.LastName],
      this.form.controls[this.formFields.Confirm],
      this.form.controls[this.formFields.Country],
      this.form.controls[this.formFields.City],
    ].forEach(control => {
      if (existingUser) {
        control.disable();
      } else {
        control.enable();
      }
    });
  }
}
