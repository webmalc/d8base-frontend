import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GrantTypes} from '@app/auth/enums/grant-types';
import {AuthResponseInterface} from '@app/auth/interfaces/auth-response.interface';
import {Credentials} from '@app/auth/interfaces/credentials';
import {AuthenticatorInterface} from '@app/core/interfaces/authenticator.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

/**
 *  Main authentication service
 */
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements AuthenticatorInterface {

    public isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private readonly TOKEN_OBTAIN_URL = environment.backend.auth;
    private readonly TOKEN_REFRESH_URL = environment.backend.refresh;

    constructor(private tokenManager: TokenManagerService, private client: ApiClientService) {
    }

    public getIsAuthenticatedSubject(): BehaviorSubject<boolean> {
        return this.isAuthenticated$;
    }

    public login({username, password}: Credentials): Observable<void> {
        return new Observable<void>(subscriber => {
            const loginData = {
                username,
                password,
                grant_type: GrantTypes.PasswordGrantType,
                client_id: environment.client_id,
                client_secret: environment.client_secret,
            };

            // @ts-ignore
            this.client.post<AuthResponseInterface>(this.TOKEN_OBTAIN_URL, loginData).subscribe(
                (result: AuthResponseInterface) => {
                    this.tokenManager.setTokens(result).then(
                        _ => {
                            this.isAuthenticated$.next(true);
                            subscriber.next();
                            subscriber.complete();
                        }
                    );
                },
                (authError: HttpErrorResponse) => {
                    this.isAuthenticated$.next(false);
                    subscriber.error(authError);
                }
            );
        });
    }

    public isAuthenticated(): Observable<boolean> {
        return from(this.tokenManager.isRefreshTokenExpired()).pipe(
            tap((isExpired: boolean) => this.isAuthenticated$.next(!isExpired)),
            switchMap((isExpired: boolean) => of(!isExpired)),
            catchError(error => of(false))
        );
    }

    public logout(): Promise<any> {
        this.isAuthenticated$.next(false);

        return this.tokenManager.clear();
    }

    public needToRefresh(): Promise<boolean> {
        return this.tokenManager.needToRefresh();
    }

    public refresh(): Observable<void> {
        return new Observable<void>(
            (subscriber) => {
                this.tokenManager.getRefreshToken().then(refresh => {
                    const refreshData = {refresh_token: refresh, grant_type: GrantTypes.RefreshGrantType};
                    // @ts-ignore
                    this.client.post<AuthResponseInterface>(this.TOKEN_REFRESH_URL, refreshData).subscribe(
                        (response: AuthResponseInterface) => {
                            this.tokenManager.setTokens(response).then(
                                _ => {
                                    this.isAuthenticated$.next(true);
                                    subscriber.next();
                                    subscriber.complete();
                                }
                            );
                        },
                        _ => {
                            this.isAuthenticated$.next(false);
                            subscriber.error();
                        }
                    );
                });
            }
        );
    }
}
