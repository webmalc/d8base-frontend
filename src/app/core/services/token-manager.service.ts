import {Injectable} from '@angular/core';
import {AuthResponseInterface} from '@app/auth/interfaces/auth-response.interface';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {JwtHelper} from '@app/core/proxies/jwt-helper.service';

@Injectable({
    providedIn: 'root'
})
export class TokenManagerService {

    private readonly ACCESS_TOKEN_STORAGE_KEY = 'api_token';
    private readonly REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';

    public token: string = undefined;

    constructor(
        private storage: StorageManagerService,
        private jwtHelper: JwtHelper
    ) {
    }

    public async getAccessToken(): Promise<string> {
        if (undefined !== this.token) {
            return this.token;
        }

        const token = await this.storage.get(this.ACCESS_TOKEN_STORAGE_KEY);

        return this.token = token;
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

    public needToRefresh(): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.isAccessTokenExpired().then(
                isAccessTokenExpired => {
                    if (isAccessTokenExpired) {
                        this.isRefreshTokenExpired().then(
                            isRefreshTokenExpired => {
                                if (!isRefreshTokenExpired) {
                                    resolve(true);
                                } else {
                                    resolve(false);
                                }
                            }
                        );
                    } else {
                        resolve(false);
                    }
                }
            );
        });
    }

    public isAccessTokenExpired(): Promise<boolean> {
        return this.isAbstractTokenExpired(this.getAccessToken());
    }

    public getRefreshToken(): Promise<any> {
        return this.storage.get(this.REFRESH_TOKEN_STORAGE_KEY);
    }

    private isRefreshTokenExpired(): Promise<boolean> {
        return this.isAbstractTokenExpired(this.getRefreshToken());
    }

    private isAbstractTokenExpired(tokenHandler: Promise<any>): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            tokenHandler.then(
                token => {
                    if (null !== token) {
                        resolve(this.jwtHelper.isTokenExpired(token));
                    } else {
                        resolve(false);
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
