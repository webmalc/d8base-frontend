import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Credentials} from '@app/auth/interfaces/credentials';
import {AuthenticationService} from '@app/core/services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    private errorMessage: string;

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    public onSubmitLoginForm(user: Credentials) {
        this.authService.login(user).subscribe(
            _ => {
                console.log('successfully authenticated');
                // return this.router.navigateByUrl('/home');
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
