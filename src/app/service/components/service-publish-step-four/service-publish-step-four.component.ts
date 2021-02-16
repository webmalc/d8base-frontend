import { Component, OnDestroy, ViewChild } from '@angular/core';
import { RegistrationService } from '@app/auth/services/registration.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { IsUserRegisteredApiService } from '@app/core/services/is-user-registered-api.service';
import { MasterManagerService } from '@app/core/services/master-manager.service';
import { UserManagerService } from '@app/core/services/user-manager.service';
import { City } from '@app/profile/models/city';
import { Country } from '@app/profile/models/country';
import { ServicePublishStepFourFormFields } from '@app/service/enums/service-publish-step-four-form-fields';
import { ServicePublishSteps } from '@app/service/enums/service-publish-steps';
import { ServicePublishStepFourFormService } from '@app/service/forms/service-publish-step-four-form.service';
import { StepFourDataInterface } from '@app/service/interfaces/step-four-data-interface';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import { ServiceStepsNavigationService } from '@app/service/services/service-steps-navigation.service';
import { Reinitable } from '@app/shared/abstract/reinitable';
import { SelectableCityOnSearchService } from '@app/shared/services/selectable-city-on-search.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { IonContent } from '@ionic/angular';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
import ServicePublishStepFourContext from './service-publish-step-four-context.interface';

@Component({
  selector: 'app-service-publish-step-four',
  templateUrl: './service-publish-step-four.component.html',
  styleUrls: ['./service-publish-step-four.component.scss'],
})
export class ServicePublishStepFourComponent extends Reinitable implements OnDestroy {

  public context$: Observable<ServicePublishStepFourContext>;
  public errorMessages: string[];
  public readonly formFields = ServicePublishStepFourFormFields;
  public isUserExists: boolean = false;
  @ViewChild(IonContent, { read: IonContent, static: false }) public content: IonContent;
  private readonly isUserExists$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly emailChanged$: Subject<void> = new Subject<void>();
  private readonly destroy$ = new Subject<void>();

  constructor(
    public formService: ServicePublishStepFourFormService,
    private readonly isRegisteredApi: IsUserRegisteredApiService,
    private readonly masterManager: MasterManagerService,
    public authenticationService: AuthenticationService,
    public serviceStepsNavigationService: ServiceStepsNavigationService,
    private readonly registrationService: RegistrationService,
    private readonly servicePublishDataHolder: ServicePublishDataHolderService,
    private readonly userManager: UserManagerService,
    public readonly countrySelectable: SelectableCountryOnSearchService,
    public readonly citySelectable: SelectableCityOnSearchService,
  ) {
    super();
    this.context$ = combineLatest([
      authenticationService.isAuthenticated$,
      this.isUserExists$,
    ]).pipe(
      map(([isAuthenticated, isUserExists]) => ({ isAuthenticated, isUserExists })),
    );
  }

  public onEmailChange(): void {
    if (this.formService.isEmailValid()) {
      this.emailChanged$.next();
    }
  }

  public onCountryChange(): void {
    this.formService.setControlDisabled(false, this.formFields.City);
    this.formService.form.get(this.formFields.City).reset();
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
      this.registrationService.register(
        this.formService.form.getRawValue(),
        {
          location: {
            country: country.id,
            city: city.id,
            is_default: true,
          },
        },
      );
    }
    this.serviceStepsNavigationService.next();
  }

  public isSubmitDisabled(): boolean {
    if (this.formService.form) {
      if (this.isUserExists) {
        return !(this.formService.form.get(this.formFields.Email).valid &&
          this.formService.form.get(this.formFields.Password).valid);
      }

      return !(this.formService.form.get(this.formFields.Email).valid &&
        this.formService.form.get(this.formFields.Password).valid &&
        this.formService.form.get(this.formFields.Confirm).valid &&
        this.formService.form.get(this.formFields.Country).value &&
        this.formService.form.get(this.formFields.City).value);
    }

    return true;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  protected init(): void {
    this.authenticationService.isAuthenticated$.pipe(first(), filter(val => true === val)).subscribe(
      () => this.masterManager.isMaster$.pipe(filter(val => true === val)).subscribe(
        () => this.masterManager.getMasterList().pipe(filter(data => data.length !== 0)).subscribe(
          () => this.userManager.getCurrentUser().subscribe(
            user => this.servicePublishDataHolder.setStepData<StepFourDataInterface>(
              ServicePublishSteps.Four, { isNewMaster: false, user, isNewUser: false },
            ).then(() => this.serviceStepsNavigationService.next()),
          ),
        ),
      ),
    );
    this.formService.createForm();
    this.emailChanged$.pipe(
      switchMap(() => this.isRegisteredApi.isEmailRegistered(this.formService.form.get(this.formFields.Email).value)),
      takeUntil(this.destroy$),
    ).subscribe(val => {
      this.isUserExists$.next(val);
      this.isUserExists = val;
    });
  }
}
