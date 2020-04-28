import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Credentials} from '@app/auth/interfaces/credentials';
import {AuthenticationFactory} from '@app/core/services/authentication-factory.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    public errorMessage: string;

    constructor(
        private authFactory: AuthenticationFactory,
        private router: Router,
        private masterManager: MasterManagerService
    ) {
    }

    public ngOnInit(): void {
    }

    public onSubmitLoginForm(user: Credentials): void {
        this.authFactory.getAuthenticator().login(user).subscribe(
            _ => {
                this.masterManager.updateIsMaster();

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
