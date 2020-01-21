import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {TokenManagerService} from '@app/auth/services/token-manager.service';
import {User} from '@app/shared/models/user';
import {AuthenticationService} from '@app/auth/services/authentication.service';
import {Credentials} from '@app/auth/interfaces/credentials';

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
                    this.errorMessage = 'incorrect login or password';
                    console.log(error);
                } else {
                    console.log('something went wrong');
                }
            }
        );
    }
}
