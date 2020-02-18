import {Injectable} from '@angular/core';
import {TokenInterface} from '@app/core/interfaces/token.interface';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class JwtHelper {

    private auth0JwtHelper: JwtHelperService = new JwtHelperService();

    public isTokenExpired(token?: string, offsetSeconds?: number): boolean {
        return this.auth0JwtHelper.isTokenExpired(token, offsetSeconds);
    }

    public decodeToken(token?: string): TokenInterface {
        return this.auth0JwtHelper.decodeToken(token);
    }
}
