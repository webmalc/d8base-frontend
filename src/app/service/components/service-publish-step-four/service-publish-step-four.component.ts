import { Component, OnInit } from '@angular/core';
import { Profile } from '@app/api/models';
import { RegistrationService } from '@app/auth/services/registration.service';
import { NgDestroyService } from '@app/core/services';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { IsUserRegisteredApiService } from '@app/core/services/is-user-registered-api.service';
import { City } from '@app/profile/models/city';
import { Country } from '@app/profile/models/country';
import { ServicePublishStepFourFormFields } from '@app/service/enums/service-publish-step-four-form-fields';
import { ServicePublishStepFourFormService } from '@app/service/forms/service-publish-step-four-form.service';
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
export class ServicePublishStepFourComponent implements OnInit {

  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<Profile>;

  public context$: Observable<ServicePublishStepFourContext>;
  public errorMessages: string[];
  public readonly formFields = ServicePublishStepFourFormFields;
  public isUserExists: boolean = false;
  private readonly isUserExists$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly emailChanged$: Subject<void> = new Subject<void>();

  constructor(
    public formService: ServicePublishStepFourFormService,
    public serviceStepsNavigationService: ServiceStepsNavigationService,
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
    this.subscribeOnProfile();
  }

  public onEmailChange(): void {
    if (this.formService.isEmailValid()) {
      this.emailChanged$.next();
    }
  }

  public getCountryValue(): Country {
    return this.formService.getFormFieldValue(this.formFields.Country);
  }

  public submitForm(): void {
    this.errorMessages = null;
    if (this.isUserExists) {
      this.authenticationService.login(
        {
          username: this.formService.form.get(this.formFields.Email).value,
          password: this.formService.form.get(this.formFields.Password).value,
        },
      );
    } else {
      const country = this.formService.form.get(this.formFields.Country).value as Country;
      const city = this.formService.form.get(this.formFields.City).value as City;
      this.registrationService.register({
          first_name: this.formService.form.get(this.formFields.FirstName).value,
          last_name: this.formService.form.get(this.formFields.LastName).value,
          email: this.formService.form.get(this.formFields.Email).value,
          password: this.formService.form.get(this.formFields.Password).value,
          password_confirm: this.formService.form.get(this.formFields.Confirm).value,
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
    if (this.formService.form) {
      if (this.isUserExists) {
        return !(this.formService.form.get(this.formFields.Email).valid &&
          this.formService.form.get(this.formFields.Password).valid);
      }

      return !(this.formService.form.get(this.formFields.Email).valid &&
        this.formService.form.get(this.formFields.FirstName).valid &&
        this.formService.form.get(this.formFields.Password).valid &&
        this.formService.form.get(this.formFields.Confirm).valid &&
        this.formService.form.get(this.formFields.Country).value &&
        this.formService.form.get(this.formFields.City).value);
    }

    return true;
  }

  public ngOnInit(): void {
    this.formService.createForm();
    this.subscribeOnCountryChanges();
    this.subscribeOnEmailChanges();
  }

  private subscribeOnProfile(): void {
    this.profile$.pipe(
      first(profile => !!profile?.account_type),
    ).subscribe(() => this.serviceStepsNavigationService.next());
  }

  private subscribeOnEmailChanges(): void {
    this.emailChanged$.pipe(
      switchMap(() => this.isRegisteredApi.isEmailRegistered(this.formService.form.get(this.formFields.Email).value)),
      takeUntil(this.destroy$),
    ).subscribe(val => {
      this.isUserExists$.next(val);
      this.isUserExists = val;
    });
  }

  private subscribeOnCountryChanges(): void {
    this.formService.form.get(this.formFields.Country).valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onCountryChanged());
  }

  private onCountryChanged(): void {
    this.formService.setControlDisabled(false, this.formFields.City);
    this.formService.form.get(this.formFields.City).reset();
  }
}
