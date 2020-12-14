import {Component, OnDestroy} from '@angular/core';
import {RegistrationService} from '@app/auth/services/registration.service';
import {Master} from '@app/core/models/master';
import {User} from '@app/core/models/user';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {IsUserRegisteredApiService} from '@app/core/services/is-user-registered-api.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {ServicePublishStepFourFormFields} from '@app/service/enums/service-publish-step-four-form-fields';
import {ServicePublishSteps} from '@app/service/enums/service-publish-steps';
import {ServicePublishStepFourFormService} from '@app/service/forms/service-publish-step-four-form.service';
import {StepFourDataInterface} from '@app/service/interfaces/step-four-data-interface';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {ServiceStepsNavigationService} from '@app/service/services/service-steps-navigation.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {plainToClass} from 'class-transformer';
import {BehaviorSubject, forkJoin, Observable, Subject, Subscription} from 'rxjs';
import {filter, first, switchMap, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-service-publish-step-four',
    templateUrl: './service-publish-step-four.component.html',
    styleUrls: ['./service-publish-step-four.component.scss']
})
export class ServicePublishStepFourComponent extends Reinitable implements OnDestroy {

    public readonly formFields = ServicePublishStepFourFormFields;
    public readonly isUserExists$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isUserExists: boolean = false;
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
        private readonly userManager: UserManagerService
    ) {
        super();
    }

    public onEmailChange(): void {
        if (this.formService.isEmailValid()) {
            this.emailChanged$.next();
        }
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
                        ServicePublishSteps.Four, {isNewMaster: (masterList as Master[]).length === 0, user, isNewUser: false}
                    ).then(
                        () => this.serviceStepsNavigationService.next()
                    );
                })
            );
        } else {
            this.registrationService.register(plainToClass(User, this.formService.form.getRawValue())).subscribe(
                user => {
                    this.servicePublishDataHolder.setStepData<StepFourDataInterface>(
                        ServicePublishSteps.Four, {isNewMaster: true, user, isNewUser: true}
                    ).then(() => this.serviceStepsNavigationService.next());
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

    public ngOnDestroy(): void {
        this.destroy$.next();
    }

    protected init(): void {
        this.authenticationService.isAuthenticated$.pipe(first(), filter(val => true === val)).subscribe(
            () => this.masterManager.isMaster().pipe(filter(val => true === val)).subscribe(
                () => this.masterManager.getMasterList().pipe(filter(data => data.length !== 0)).subscribe(
                    () => this.userManager.getCurrentUser().subscribe(
                        user => this.servicePublishDataHolder.setStepData<StepFourDataInterface>(
                            ServicePublishSteps.Four, {isNewMaster: false, user, isNewUser: false}
                        ).then(() => this.serviceStepsNavigationService.next())
                    )
                )
            )
        );
        this.formService.createForm();
        this.emailChanged$.pipe(
            switchMap(() => this.isRegisteredApi.isEmailRegistered(this.formService.form.get(this.formFields.Email).value)),
            takeUntil(this.destroy$)
        ).subscribe(val => {
            this.isUserExists$.next(val);
            this.isUserExists = val;
        });
    }
}
