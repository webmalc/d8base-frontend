import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '@app/auth/services/registration.service';
import { User } from '@app/core/models/user';
import { UserLocation } from '@app/core/models/user-location';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { IsUserRegisteredApiService } from '@app/core/services/is-user-registered-api.service';
import { passwordValidators } from '@app/core/validators/password-validators';
import { OrderIds } from '@app/order/enums/order-ids.enum';
import StepContext from '@app/order/interfaces/step-context.interface';
import { OrderWizardStateService } from '@app/order/services';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const NEXT_STEP_ID = OrderIds.Location;

@Component({
    selector: 'app-client-identification',
    templateUrl: './client-identification.component.html',
    styleUrls: ['./client-identification.component.scss'],
})
export class ClientIdentificationComponent {
    public context$: Observable<StepContext> = this.wizardState.getContext();
    public email = new FormControl('', Validators.required);
    public password = new FormControl('', passwordValidators);
    public passwordConfirm = new FormControl({ value: '', disabled: true}, passwordValidators);
    public name = new FormControl({ value: '', disabled: true}, Validators.required);
    public country = new FormControl({ value: '', disabled: true}, Validators.required);
    public form = new FormGroup({
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
        name: this.name,
        country: this.country,
    });
    public isRegistered;
    public showRegistrationForm = false;

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

        let request: Observable<any>;
        if (this.isRegistered) {
            request = this.authenticator.login({
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
            const user = plainToClass(User, userData, { excludeExtraneousValues: true});
            const userLocation = plainToClass(UserLocation, locationData, { excludeExtraneousValues: true});
            request = this.registrar.register(user, userLocation);
        }
        request.pipe(switchMap(() => this.context$)).subscribe(context =>
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
