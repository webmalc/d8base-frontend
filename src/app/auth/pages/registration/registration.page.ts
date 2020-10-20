import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {RegistrationService} from '@app/auth/services/registration.service';
import {User} from '@app/core/models/user';
import {UserLocation} from '@app/core/models/user-location';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {

    constructor(private readonly registrationService: RegistrationService, private readonly router: Router) {
    }

    public onSubmitRegistrationForm(data: {user: User, location: UserLocation}): void {
        this.registrationService.register(data.user, data.location).subscribe(
            next => {
                this.router.navigateByUrl('/profile');
            }
        );
    }

}
