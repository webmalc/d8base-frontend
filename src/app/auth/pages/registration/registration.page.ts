import {HttpErrorResponse} from '@angular/common/http';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {RegistrationService} from '@app/auth/services/registration.service';
import {User} from '@app/core/models/user';
import {UserLocation} from '@app/core/models/user-location';
import {HelperService} from '@app/core/services/helper.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss']
})
export class RegistrationPage {

    public errorMessages: string[];

    constructor(private readonly registrationService: RegistrationService, private readonly router: Router) {
    }

    public onSubmitRegistrationForm(data: {user: User, location: UserLocation}): void {
        this.errorMessages = null;
        this.registrationService.register(data.user, data.location).subscribe(
            next => {
                this.router.navigateByUrl('/profile');
            },
            (err: HttpErrorResponse) => {
                this.errorMessages = HelperService.getErrorListFromHttpErrorResponse(err.error);
            }
        );
    }
}
