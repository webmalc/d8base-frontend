import {Injectable} from '@angular/core';
import {AuthResponseInterface} from '@app/auth/interfaces/auth-response.interface';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TokenManagerService {

    public tokenData: AuthResponseInterface = undefined;

    private readonly TOKEN_DATA_STORAGE_KEY = 'api_token_data';

    constructor(private storage: StorageManagerService) {}

    public getAccessToken(): Promise<string> {
        if (undefined !== this.tokenData && null !== this.tokenData) {
            return Promise.resolve(this.tokenData.access_token);
        }

        return new Promise<string>(resolve => {
            this.getTokenData().then(
                (tokenData: AuthResponseInterface) => {
                    this.tokenData = tokenData;
                    resolve(this.tokenData?.access_token);
                }
            );
        });
    }

    public getRefreshToken(): Promise<string> {
        return new Promise(resolve => {
            this.getTokenData().then(
                (tokenData: AuthResponseInterface) => resolve(tokenData.refresh_token)
            );
        });
    }

    public setTokens(data: AuthResponseInterface): Promise<any> {
        data.access_expire = this.getTimestamp(data.expires_in);
        data.refresh_expire = this.getTimestamp(environment.refresh_token_expire_time);
        this.tokenData = data;

        return this.storage.set(this.TOKEN_DATA_STORAGE_KEY, data);
    }

    public clear(): Promise<any> {
        this.tokenData = undefined;

        return this.storage.remove(this.TOKEN_DATA_STORAGE_KEY);
    }

    public isAccessTokenExpired(): Promise<boolean> {
        return this.isAbstractTokenExpired('access_expire');
    }

    public isRefreshTokenExpired(): Promise<boolean> {
        return this.isAbstractTokenExpired('refresh_expire');
    }

    public needToRefresh(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.isAccessTokenExpired().then(
                (isAccessTokenExpired: boolean) => {
                    if (isAccessTokenExpired) {
                        this.isRefreshTokenExpired().then(
                            (isRefreshTokenExpired: boolean) => {
                                resolve(!isRefreshTokenExpired);
                            }
                        ).catch(err => reject(err));
                    } else {
                        resolve(false);
                    }
                }
            ).catch(err => reject(err));
        });
    }

    private getTokenData(): Promise<AuthResponseInterface> {
        if (undefined !== this.tokenData && null !== this.tokenData) {
            return Promise.resolve(this.tokenData);
        }

        return new Promise(resolve => {
            this.storage.get(this.TOKEN_DATA_STORAGE_KEY).then(
                (tokenData: AuthResponseInterface) => resolve(tokenData)
            );
        });
    }

    private getTimestamp(offset: number = 0): number {
        return parseInt((new Date().getTime() / 1000).toFixed(0), 10) + offset;
    }

    private isAbstractTokenExpired(tokenType: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.getTokenData().then(
                (tokenData: AuthResponseInterface) => {
                    if (tokenData && tokenData[tokenType]) {
                        resolve(this.getTimestamp() >= tokenData[tokenType]);
                    } else {
                        reject();
                    }
                }
            );
        });
    }
}
