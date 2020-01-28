import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {from, Observable, of} from 'rxjs';
import {AuthResponseInterface} from '@app/auth/interfaces/auth-response.interface';
import {Credentials} from '@app/auth/interfaces/credentials';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {AuthenticatorInterface} from '@app/core/interfaces/authenticator.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {JwtHelper} from '@app/core/proxies/jwt-helper.service';
import {switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements AuthenticatorInterface {

    private readonly TOKEN_OBTAIN_URL = environment.backend.api_auth_url;
    private readonly TOKEN_REFRESH_URL = environment.backend.api_refresh_url;

    constructor(private tokenManager: TokenManagerService, private client: ApiClientService, private jwt: JwtHelper) {
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

    public getUserId(): Observable<number> {
        return from(this.tokenManager.getAccessToken()).pipe(
            switchMap(
                token => {
                    const decoded = this.jwt.decodeToken(token);

                    return of(decoded.user_id);
                }
            )
        );
    }
}
