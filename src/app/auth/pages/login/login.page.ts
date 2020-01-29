import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Credentials} from '@app/auth/interfaces/credentials';
import {AuthenticationFactory} from '@app/core/services/authentication-factory.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    private errorMessage: string;

    constructor(
        private authFactory: AuthenticationFactory,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    public onSubmitLoginForm(user: Credentials) {
        this.authFactory.getAuthenticator().login(user).subscribe(
            _ => {
                console.log('successfully authenticated');
                return this.router.navigateByUrl('/profile');
            },
            (error: HttpErrorResponse) => {
                if (401 === error.status) {
                    this.errorMessage = 'login-page.incorrect-login-data';
                } else {
                    console.log('something went wrong');
                }
            }
        );
    }
}
