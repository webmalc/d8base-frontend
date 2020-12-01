import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GrantTypes} from '@app/auth/enums/grant-types';
import {AuthResponseInterface} from '@app/auth/interfaces/auth-response.interface';
import {Credentials} from '@app/auth/interfaces/credentials';
import {once} from '@app/core/decorators/once';
import {AuthenticatorInterface} from '@app/core/interfaces/authenticator.interface';
import {LoginDataInterface} from '@app/core/interfaces/login-data-interface';
import {RefreshDataInterface} from '@app/core/interfaces/refresh-data-interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {PreLogoutService} from '@app/core/services/pre-logout.service';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {environment} from '@env/environment';
import {EMPTY, from, Observable, ReplaySubject} from 'rxjs';
import {filter, first, takeUntil} from 'rxjs/operators';

/**
 *  Main authentication service
 */
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements AuthenticatorInterface {

    public readonly isAuthenticated$: Observable<boolean>;
    private readonly isAuthenticatedSubject$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    private readonly TOKEN_OBTAIN_URL = environment.backend.auth;
    private readonly TOKEN_REFRESH_URL = environment.backend.refresh;

    constructor(
        private readonly tokenManager: TokenManagerService,
        private readonly client: ApiClientService,
        private readonly preLogout: PreLogoutService
    ) {
        this.isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();
    }

    @once
    public init(): void {
        this.tokenManager.isRefreshTokenExpired()
            .then(isExp => this.isAuthenticatedSubject$.next(!isExp))
            .catch(_ => this.isAuthenticatedSubject$.next(false))
            .finally(
                () => this.tokenManager.isExpired$.subscribe(isExpired => this.isAuthenticated$.pipe(first()).subscribe(
                    previousIsAuthStatus => isExpired === previousIsAuthStatus ? this.isAuthenticatedSubject$.next(!isExpired) : EMPTY
                ))
            );
    }

    public login({username, password}: Credentials): Observable<void> {
        return new Observable<void>(subscriber => this.client.post<AuthResponseInterface, LoginDataInterface>(this.TOKEN_OBTAIN_URL, {
            username,
            password,
            grant_type: GrantTypes.PasswordGrantType,
            client_id: environment.client_id,
            client_secret: environment.client_secret
        }).subscribe(
            (result: AuthResponseInterface) => this.tokenManager.setTokens(result).then(
                _ => this.isAuthenticated$.pipe(takeUntil(this.isAuthenticated$.pipe(filter(isAuth => isAuth)))).subscribe(
                    () => EMPTY,
                    () => EMPTY,
                    () => {
                        subscriber.next();
                        subscriber.complete();
                    }
                )
            ),
            (authError: HttpErrorResponse) => this.logout().subscribe(() => subscriber.error(authError))
        ));
    }

    public needToRefresh(): Observable<boolean> {
        return from(this.tokenManager.needToRefresh());
    }

    public logout(): Observable<void> {
        return from(this.preLogout.run().then(() => this.tokenManager.clear()));
    }

    public authenticateWithToken(token: AuthResponseInterface): Promise<void> {
        return this.tokenManager.setTokens(token);
    }

    public refresh(): Observable<void> {
        return new Observable<void>(
            (subscriber) => {
                this.tokenManager.getRefreshToken().then(refresh => {
                    const refreshData: RefreshDataInterface = {refresh_token: refresh, grant_type: GrantTypes.RefreshGrantType};
                    this.client.post<AuthResponseInterface, RefreshDataInterface>(this.TOKEN_REFRESH_URL, refreshData).subscribe(
                        (response: AuthResponseInterface) => this.tokenManager.setTokens(response).then(
                            _ => {
                                subscriber.next();
                                subscriber.complete();
                            }
                        ),
                        _ => this.logout().subscribe(() => subscriber.error())
                    );
                }).catch(err => subscriber.error(err));
            }
        );
    }
}
