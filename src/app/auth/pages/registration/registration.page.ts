import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RegistrationService} from '@app/auth/services/registration.service';
import {User} from '@app/shared/models/user';
import {LocationService} from '@app/core/services/location/location.service';
import {LocationModel} from '@app/core/models/location.model';
import {AsyncSubject} from 'rxjs';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

    constructor(private registrationService: RegistrationService, private router: Router, private location: LocationService) {
    }

    ngOnInit() {
    }

    public onSubmitRegistrationForm(data: {user: User, location: LocationModel}) {
        this.registrationService.register(data.user, data.location).subscribe(
            next => {
                console.log(next);
                this.router.navigateByUrl('/auth/login');
            }
        );
    }

}
