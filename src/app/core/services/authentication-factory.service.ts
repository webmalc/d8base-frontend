import {Injectable} from '@angular/core';
import {AuthenticatorInterface} from '@app/core/interfaces/authenticator.interface';
import {AuthenticationService} from '@app/core/services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationFactory {

    constructor(private mainAuthenticator: AuthenticationService) {
    }

    public getAuthenticator(): AuthenticatorInterface {
        return this.mainAuthenticator;
    }
}
