import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenInterface} from '@app/core/interfaces/token.interface';

@Injectable({
    providedIn: 'root'
})
export class JwtHelper {

    private auth0JwtHelper: JwtHelperService = new JwtHelperService();

    constructor() {
    }

    public isTokenExpired(token?: string, offsetSeconds?: number): boolean {
        return this.auth0JwtHelper.isTokenExpired(token);
    }

    public decodeToken(token?: string): TokenInterface {
        return this.auth0JwtHelper.decodeToken(token);
    }
}
