import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RegistrationService} from '@app/auth/services/registration.service';
import {User} from '@app/shared/models/user';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

    constructor(private registrationService: RegistrationService, private router: Router) {
    }

    ngOnInit() {
    }

    public onSubmitRegistrationForm(user: User) {
        this.registrationService.register(user).subscribe(
            next => {
                console.log(next);
                this.router.navigateByUrl('/auth/login');
            }
        );
    }

}
