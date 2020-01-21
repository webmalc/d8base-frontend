import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthResponseInterface} from '../interfaces/auth-response.interface';
import {HttpClient} from '@angular/common/http';
import {AbstractAuthService} from './abstract-auth.service';
import {StorageManagerService} from '@app/core/services/storage-manager.service';
import {environment} from '../../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class TokenManagerService extends AbstractAuthService {

    private readonly ACCESS_TOKEN_STORAGE_KEY = 'api_token';
    private readonly REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';

    public token: string = undefined;

    constructor(private storage: StorageManagerService, protected http: HttpClient, private jwtHelper: JwtHelperService) {
        super(http);
    }

    public async getAccessToken(): Promise<string> {
        if (undefined !== this.token) {
            return this.token;
        }

        const token = await this.storage.get(this.ACCESS_TOKEN_STORAGE_KEY);

        return this.token = token;
    }

    public getRefreshToken(): Promise<any> {
        return this.storage.get(this.REFRESH_TOKEN_STORAGE_KEY);
    }

    public setTokens(data: AuthResponseInterface): Promise<any> {
        return Promise.all([
            this.setRefreshToken(data.refresh),
            this.setAccessToken(data.access)
        ]);
    }

    public clear(): Promise<any> {
        this.token = undefined;

        return Promise.all([
            this.storage.remove(this.ACCESS_TOKEN_STORAGE_KEY),
            this.storage.remove(this.REFRESH_TOKEN_STORAGE_KEY)
        ]);
    }

    public isAccessTokenExpired(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.getAccessToken().then(
                token => {
                    if (token) {
                        resolve(this.jwtHelper.isTokenExpired(token));
                    } else {
                        resolve(true);
                    }
                }
            );
        });
    }

    private setAccessToken(token: string): Promise<any> {
        this.token = token;

        return this.storage.set(this.ACCESS_TOKEN_STORAGE_KEY, token);
    }

    private setRefreshToken(refresh: string): Promise<any> {
        return this.storage.set(this.REFRESH_TOKEN_STORAGE_KEY, refresh);
    }
}
