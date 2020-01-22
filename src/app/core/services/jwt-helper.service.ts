import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

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

    public decodeToken(token?: string): any {
        return this.auth0JwtHelper.decodeToken(token);
    }
}
