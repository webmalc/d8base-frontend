import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../../../../shared/models/user.model';
import {RegistrationService} from '../../../services/registration.service';
import {Router} from '@angular/router';

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

    public onSubmitRegistrationForm(user: UserModel) {
        this.registrationService.register(user).subscribe(
            next => {
                console.log(next);
                this.router.navigateByUrl('/auth/login', { queryParams: {} });
            }
        );
    }

}
