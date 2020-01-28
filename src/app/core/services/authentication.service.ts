import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Observable} from 'rxjs';
import {AuthResponseInterface} from '@app/auth/interfaces/auth-response.interface';
import {Credentials} from '@app/auth/interfaces/credentials';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {AuthenticatorInterface} from '@app/core/interfaces/authenticator.interface';
import {ApiClientService} from '@app/core/services/api-client.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements AuthenticatorInterface {

    private readonly TOKEN_OBTAIN_URL = environment.backend.api_auth_url;
    private readonly TOKEN_REFRESH_URL = environment.backend.api_refresh_url;

    constructor(private tokenManager: TokenManagerService, private client: ApiClientService) {
    }

    public login(credentials: Credentials): Observable<void> {
        return new Observable<void>(subscriber => {
            this.client.post(this.TOKEN_OBTAIN_URL, credentials).subscribe(
                (result: AuthResponseInterface) => {
                    this.tokenManager.setTokens(result).then(
                        _ => {
                            subscriber.next();
                            subscriber.complete();
                        }
                    );
                },
                (authError: HttpErrorResponse) => {
                    subscriber.error(authError);
                }
            );
        });
    }

    public isAuthenticated(): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.tokenManager.isAccessTokenExpired().then(res => resolve(!res));
        });
    }

    public logout(): Promise<any> {
        return this.tokenManager.clear();
    }

    public needToRefresh(): Promise<boolean> {
        return this.tokenManager.needToRefresh();
    }

    public refresh(): Observable<void> {
        return new Observable<void>(
            (subscriber) => {
                this.tokenManager.getRefreshToken().then(refresh => {
                    this.client.post(this.TOKEN_REFRESH_URL, {refresh}).subscribe(
                        (response: AuthResponseInterface) => {
                            this.tokenManager.setTokens(response).then(
                                _ => {
                                    subscriber.next();
                                    subscriber.complete();
                                }
                            );
                        },
                        _ => {
                            subscriber.error();
                        }
                    );
                });
            }
        );
    }
}
