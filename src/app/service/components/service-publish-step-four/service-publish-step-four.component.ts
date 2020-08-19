import {Component, OnInit} from '@angular/core';
import {RegistrationService} from '@app/auth/services/registration.service';
import {Master} from '@app/core/models/master';
import {User} from '@app/core/models/user';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {IsUserRegisteredApiService} from '@app/core/services/is-user-registered-api.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {ServicePublishStepFourFormFields} from '@app/service/enums/service-publish-step-four-form-fields';
import {ServicePublishStepFourFormService} from '@app/service/forms/service-publish-step-four-form.service';
import {StepFourDataInterface} from '@app/service/interfaces/step-four-data-interface';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {ServiceStepsNavigationService} from '@app/service/services/service-steps-navigation.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {plainToClass} from 'class-transformer';
import {forkJoin, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-service-publish-step-four',
    templateUrl: './service-publish-step-four.component.html',
    styleUrls: ['./service-publish-step-four.component.scss'],
})
export class ServicePublishStepFourComponent extends Reinitable implements OnInit {

    public static readonly STEP = 3;
    public readonly formFields = ServicePublishStepFourFormFields;
    public isUserExists: boolean = false;
    private checkEmailSubscription: Subscription = null;

    constructor(
        public formService: ServicePublishStepFourFormService,
        private isRegisteredApi: IsUserRegisteredApiService,
        private masterManager: MasterManagerService,
        public authenticationService: AuthenticationService,
        public serviceStepsNavigationService: ServiceStepsNavigationService,
        private registrationService: RegistrationService,
        private servicePublishDataHolder: ServicePublishDataHolderService,
        private userManager: UserManagerService
    ) {
        super();
    }

    public onEmailChange(): void {
        if (this.formService.isEmailValid()) {
            if (this.checkEmailSubscription) {
                this.checkEmailSubscription.unsubscribe();
            }
            this.checkEmailSubscription = this.isRegisteredApi.isEmailRegistered(this.formService.form.get(this.formFields.Email).value)
                .subscribe(
                    val => this.isUserExists = val
                );
        }
    }

    public ngOnInit(): void {
        this.authenticationService.isAuthenticated().pipe(filter(val => true === val)).subscribe(
            () => {
                this.masterManager.isMaster().pipe(filter(val => true === val)).subscribe(
                    () => {
                        this.masterManager.getMasterList().pipe(filter(data => data.length !== 0)).subscribe(
                            () => {
                                this.userManager.getCurrentUser().subscribe(
                                    user => {
                                        this.servicePublishDataHolder.setStepData<StepFourDataInterface>(
                                            ServicePublishStepFourComponent.STEP, {isNewMaster: false, user}
                                        );
                                        // this.serviceStepsNavigationService.navigateToLastStep();
                                        this.serviceStepsNavigationService.navigateToNextStep();
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
        this.formService.createForm();
    }

    public submitForm(): void {
        if (this.isUserExists) {
            this.authenticationService.login(
                {
                    username: this.formService.form.get(this.formFields.Email).value,
                    password: this.formService.form.get(this.formFields.Password).value
                }
            ).subscribe(
                _ => forkJoin({
                    masterList: this.masterManager.getMasterList(),
                    user: this.userManager.getCurrentUser()
                }).subscribe(({user, masterList}) => {
                    this.servicePublishDataHolder.setStepData<StepFourDataInterface>(
                        ServicePublishStepFourComponent.STEP, {isNewMaster: (masterList as Master[]).length === 0, user}
                    );
                    this.serviceStepsNavigationService.navigateToNextStep();
                })
            );
        } else {
            this.registrationService.register(plainToClass(User, this.formService.form.getRawValue())).subscribe(
                user => {
                    this.servicePublishDataHolder.setStepData<StepFourDataInterface>(
                        ServicePublishStepFourComponent.STEP, {isNewMaster: true, user}
                    );
                    this.serviceStepsNavigationService.navigateToNextStep();
                }
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
                this.formService.form.get(this.formFields.Password).valid &&
                this.formService.form.get(this.formFields.Confirm).valid);
        }

        return true;
    }
}
