import {Injectable} from '@angular/core';
import {AuthResponseInterface} from '@app/auth/interfaces/auth-response.interface';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {environment} from '@env/environment';

function getTimestamp(offset: number = 0): number {
    return parseInt((new Date().getTime() / 1000).toFixed(0), 10) + offset;
}

@Injectable({
    providedIn: 'root'
})
export class TokenManagerService {
    private tokenData: AuthResponseInterface;
    private readonly TOKEN_DATA_STORAGE_KEY = 'api_token_data';

    constructor(private readonly storage: StorageManagerService) {
    }

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
                (tokenData: AuthResponseInterface) => resolve(tokenData?.refresh_token)
            );
        });
    }

    public setTokens(data: AuthResponseInterface): Promise<void> {
        this.tokenData = {
            ...data,
            access_expire: getTimestamp(data.expires_in),
            refresh_expire: getTimestamp(environment.refresh_token_expire_time)
        };

        return this.storage.set(this.TOKEN_DATA_STORAGE_KEY, this.tokenData);
    }

    public clear(): Promise<any> {
        this.tokenData = undefined;

        return this.storage.remove(this.TOKEN_DATA_STORAGE_KEY);
    }

    private getTokenData(): Promise<AuthResponseInterface> {
        if (this.tokenData) {
            return Promise.resolve(this.tokenData);
        }

        return new Promise(resolve => {
            this.storage.get(this.TOKEN_DATA_STORAGE_KEY).then(
                (tokenData: AuthResponseInterface) => resolve(tokenData)
            );
        });
    }
}
