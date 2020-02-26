import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthResponseInterface} from '@app/auth/interfaces/auth-response.interface';
import {Credentials} from '@app/auth/interfaces/credentials';
import {AuthenticatorInterface} from '@app/core/interfaces/authenticator.interface';
import {TokenInterface} from '@app/core/interfaces/token.interface';
import {JwtHelper} from '@app/core/proxies/jwt-helper.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {from, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

/**
 *  Main authentication service
 */
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements AuthenticatorInterface {

    private readonly TOKEN_OBTAIN_URL = environment.backend.auth;
    private readonly TOKEN_REFRESH_URL = environment.backend.refresh;

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

    public isAuthenticated(): Observable<boolean> {
        return from(this.tokenManager.isRefreshTokenExpired()).pipe(
            switchMap(
                (isExpired: boolean) => of(!isExpired)
            )
        );
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
                    const decoded: TokenInterface = this.jwt.decodeToken(token);

                    return of(decoded.user_id);
                }
            )
        );
    }
}
