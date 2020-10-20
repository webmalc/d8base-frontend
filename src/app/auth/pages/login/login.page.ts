import {HttpErrorResponse} from '@angular/common/http';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Credentials} from '@app/auth/interfaces/credentials';
import {AuthenticationFactory} from '@app/core/services/authentication-factory.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage {

    public errorMessage: string;

    constructor(
        private readonly authFactory: AuthenticationFactory,
        private readonly router: Router,
        private readonly masterManager: MasterManagerService
    ) {
    }

    public onSubmitLoginForm(user: Credentials): void {
        this.authFactory.getAuthenticator().login(user).subscribe(
            _ => {
                this.masterManager.updateIsMaster();

                return this.router.navigateByUrl('/profile');
            },
            (error: HttpErrorResponse) => {
                if (400 === error.status && error.error.error === 'invalid_grant') {
                    this.errorMessage = 'login-page.incorrect-login-data';
                } else {
                    console.error(error.error);
                }
            }
        );
    }
}
