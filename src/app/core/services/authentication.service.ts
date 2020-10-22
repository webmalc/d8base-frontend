import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GrantTypes} from '@app/auth/enums/grant-types';
import {AuthResponseInterface} from '@app/auth/interfaces/auth-response.interface';
import {Credentials} from '@app/auth/interfaces/credentials';
import {AuthenticatorInterface} from '@app/core/interfaces/authenticator.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {PreLogoutService} from '@app/core/services/pre-logout.service';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {environment} from '@env/environment';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {catchError, map, shareReplay} from 'rxjs/operators';

interface RefreshData {
    refresh_token: string;
    grant_type: string;
}

interface LoginData {
    username: string;
    password: string;
    grant_type: string;
    client_id: string;
    client_secret: string;
}

/**
 *  Main authentication service
 */
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements AuthenticatorInterface {

    public readonly isAuthenticated$: Observable<boolean>;

    private readonly isAuthenticatedSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private readonly TOKEN_OBTAIN_URL = environment.backend.auth;
    private readonly TOKEN_REFRESH_URL = environment.backend.refresh;

    constructor(
        private readonly tokenManager: TokenManagerService,
        private readonly client: ApiClientService,
        private readonly preLogout: PreLogoutService
    ) {
        this.isAuthenticated$ = combineLatest([
            this.isAuthenticatedSubject$,
            this.tokenManager.isRefreshTokenExpired$
        ]).pipe(
            map(([isAuthenticated, isExpired]) => isAuthenticated && !isExpired),
            catchError(() => of(null)),
            shareReplay(1)
        );
    }

    public login({username, password}: Credentials): Observable<void> {
        return new Observable<void>(subscriber => {
            const loginData: LoginData = {
                username,
                password,
                grant_type: GrantTypes.PasswordGrantType,
                client_id: environment.client_id,
                client_secret: environment.client_secret
            };

            this.client.post<AuthResponseInterface, LoginData>(this.TOKEN_OBTAIN_URL, loginData).subscribe(
                (result: AuthResponseInterface) => {
                    this.tokenManager.setTokens(result).then(
                        _ => {
                            this.isAuthenticatedSubject$.next(true);
                            subscriber.next();
                            subscriber.complete();
                        }
                    );
                },
                (authError: HttpErrorResponse) => {
                    this.isAuthenticatedSubject$.next(false);
                    subscriber.error(authError);
                }
            );
        });
    }

    public async logout(): Promise<void> {
        await this.preLogout.run();
        await this.tokenManager.clear();
        this.isAuthenticatedSubject$.next(false);
    }

    public authenticateWithToken(token: AuthResponseInterface): Promise<void> {
        return this.tokenManager.setTokens(token).then(() => this.isAuthenticatedSubject$.next(true));
    }

    public isAuthenticated(): Observable<boolean> {
        return this.isAuthenticated$;
    }

    public needToRefresh(): Promise<boolean> {
        return this.tokenManager.needToRefresh();
    }

    public refresh(): Observable<void> {
        return new Observable<void>(
            (subscriber) => {
                this.tokenManager.getRefreshToken().then(refresh => {
                    const refreshData: RefreshData = {refresh_token: refresh, grant_type: GrantTypes.RefreshGrantType};

                    this.client.post<AuthResponseInterface, RefreshData>(this.TOKEN_REFRESH_URL, refreshData).subscribe(
                        (response: AuthResponseInterface) => {
                            this.tokenManager.setTokens(response).then(
                                _ => {
                                    this.isAuthenticatedSubject$.next(true);
                                    subscriber.next();
                                    subscriber.complete();
                                }
                            );
                        },
                        _ => {
                            this.isAuthenticatedSubject$.next(false);
                            subscriber.error();
                        }
                    );
                });
            }
        );
    }
}
