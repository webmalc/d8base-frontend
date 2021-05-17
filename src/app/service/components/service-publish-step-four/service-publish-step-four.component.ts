import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from '@app/api/models';
import { RegistrationService } from '@app/auth/services/registration.service';
import { NgDestroyService } from '@app/core/services';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { IsUserRegisteredApiService } from '@app/core/services/is-user-registered-api.service';
import { AppValidators } from '@app/core/validators/app.validators';
import { confirmPasswordValidator, passwordValidators } from '@app/core/validators/password-validators';
import { City } from '@app/profile/models/city';
import { Country } from '@app/profile/models/country';
import { ServicePublishStepFourFormFields } from '@app/service/enums/service-publish-step-four-form-fields';
import { ServiceStepsNavigationService } from '@app/service/services/service-steps-navigation.service';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
import ServicePublishStepFourContext from './service-publish-step-four-context.interface';

@Component({
  selector: 'app-service-publish-step-four',
  templateUrl: './service-publish-step-four.component.html',
  styleUrls: ['./service-publish-step-four.component.scss'],
  providers: [NgDestroyService],
})
export class ServicePublishStepFourComponent {

  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<Profile>;

  public form: FormGroup;
  public context$: Observable<ServicePublishStepFourContext>;
  public errorMessages: string[];
  public readonly formFields = ServicePublishStepFourFormFields;
  public isUserExists: boolean = false;
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
    this.context$ = combineLatest([
      authenticationService.isAuthenticated$,
      this.isUserExists$,
    ]).pipe(
      map(([isAuthenticated, isUserExists]) => ({ isAuthenticated, isUserExists })),
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

  public submitForm(): void {
    this.errorMessages = null;
    if (this.isUserExists) {
      this.authenticationService.login(
        {
          username: this.form.get(this.formFields.Email).value,
          password: this.form.get(this.formFields.Password).value,
        },
      );
    } else {
      const country = this.form.get(this.formFields.Country).value as Country;
      const city = this.form.get(this.formFields.City).value as City;
      this.registrationService.register({
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
  }

  public isSubmitDisabled(): boolean {
    return this.form.invalid;
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
        [ServicePublishStepFourFormFields.Email]: [null, Validators.compose([
          Validators.required,
          AppValidators.email,
        ])],
        [ServicePublishStepFourFormFields.FirstName]: ['', Validators.required],
        [ServicePublishStepFourFormFields.LastName]: [''],
        [ServicePublishStepFourFormFields.Password]: ['', passwordValidators],
        [ServicePublishStepFourFormFields.Confirm]: ['', passwordValidators],
        [ServicePublishStepFourFormFields.Country]: [null, Validators.required],
        [ServicePublishStepFourFormFields.City]: [null, Validators.required],
      },
      { validators: confirmPasswordValidator(ServicePublishStepFourFormFields.Password, ServicePublishStepFourFormFields.Confirm) });
  }

  private subscribeOnProfile(): void {
    this.profile$.pipe(
      first(profile => !!profile?.account_type),
    ).subscribe(() => this.serviceStepsNavigationService.next());
  }

  private subscribeOnEmailChanges(): void {
    this.emailChanged$.pipe(
      switchMap(() => this.isRegisteredApi.isEmailRegistered(this.form.get(this.formFields.Email).value)),
      takeUntil(this.destroy$),
    ).subscribe(val => {
      this.isUserExists$.next(val);
      this.isUserExists = val;
    });
  }
}
