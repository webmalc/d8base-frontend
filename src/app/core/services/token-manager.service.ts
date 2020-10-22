import {Injectable} from '@angular/core';
import {AuthResponseInterface} from '@app/auth/interfaces/auth-response.interface';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {environment} from '@env/environment';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

function getTimestamp(offset: number = 0): number {
    return parseInt((new Date().getTime() / 1000).toFixed(0), 10) + offset;
}

@Injectable({
    providedIn: 'root'
})
export class TokenManagerService {
    public readonly isRefreshTokenExpired$: Observable<boolean>;

    private tokenData: AuthResponseInterface;
    private readonly TOKEN_DATA_STORAGE_KEY = 'api_token_data';
    private readonly tokensUpdated$ = new BehaviorSubject<void>(void 0);

    constructor(private readonly storage: StorageManagerService) {
        this.isRefreshTokenExpired$ = this.tokensUpdated$.pipe(
            switchMap(() => from(this.isAbstractTokenExpired('refresh_expire')))
        );
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

        return this.storage.set(this.TOKEN_DATA_STORAGE_KEY, this.tokenData).then(() => this.tokensUpdated$.next());
    }

    public clear(): Promise<any> {
        this.tokenData = undefined;

        return this.storage.remove(this.TOKEN_DATA_STORAGE_KEY).then(() => this.tokensUpdated$.next());
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

    private isAccessTokenExpired(): Promise<boolean> {
        return this.isAbstractTokenExpired('access_expire');
    }

    private isRefreshTokenExpired(): Promise<boolean> {
        return this.isAbstractTokenExpired('refresh_expire');
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

    private isAbstractTokenExpired(tokenType: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.getTokenData().then(
                (tokenData: AuthResponseInterface) => {
                    if (tokenData && tokenData[tokenType]) {
                        resolve(getTimestamp() >= tokenData[tokenType]);
                    } else {
                        reject();
                    }
                }
            );
        });
    }
}
