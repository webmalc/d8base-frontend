import {Component, OnInit} from '@angular/core';
import {RegistrationService} from '@app/auth/services/registration.service';
import {User} from '@app/core/models/user';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {IsUserRegisteredApiService} from '@app/core/services/is-user-registered-api.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {ServicePublishStepFourFormFields} from '@app/service/enums/service-publish-step-four-form-fields';
import {ServicePublishStepFourFormService} from '@app/service/forms/service-publish-step-four-form.service';
import {ServiceStepsNavigationService} from '@app/service/services/service-steps-navigation.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {plainToClass} from 'class-transformer';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-service-publish-step-four',
    templateUrl: './service-publish-step-four.component.html',
    styleUrls: ['./service-publish-step-four.component.scss'],
})
export class ServicePublishStepFourComponent extends Reinitable implements OnInit {

    public readonly formFields = ServicePublishStepFourFormFields;
    public isUserExists: boolean = false;
    private readonly STEP = 3;

    constructor(
        public formService: ServicePublishStepFourFormService,
        private isRegisteredApi: IsUserRegisteredApiService,
        private masterManager: MasterManagerService,
        public authenticationService: AuthenticationService,
        public serviceStepsNavigationService: ServiceStepsNavigationService,
        private registrationService: RegistrationService
    ) {
        super();
    }

    public onEmailChange(): void {
        if (this.formService.isEmailValid()) {
            this.isRegisteredApi.isEmailRegistered(this.formService.form.get(this.formFields.Email).value).subscribe(
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
                            () => this.serviceStepsNavigationService.navigateToLastStep()
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
                _ => this.serviceStepsNavigationService.navigateToNextStep()
            );
        } else {
            this.registrationService.register(plainToClass(User, this.formService.form.getRawValue())).subscribe(
                _ => this.serviceStepsNavigationService.navigateToNextStep()
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
