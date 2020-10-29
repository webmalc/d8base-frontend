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
import {from, Observable, Subject} from 'rxjs';
import {first, map} from 'rxjs/operators';

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
    private readonly isAuthenticatedSubject$: Subject<boolean> = new Subject<boolean>();
    private readonly TOKEN_OBTAIN_URL = environment.backend.auth;
    private readonly TOKEN_REFRESH_URL = environment.backend.refresh;

    constructor(
        private readonly tokenManager: TokenManagerService,
        private readonly client: ApiClientService,
        private readonly preLogout: PreLogoutService
    ) {
        this.isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();
    }

    public init(): void {
        this.tokenManager.isExpired$.subscribe(isExpired => this.isAuthenticatedSubject$.next(!isExpired));
    }

    public login({username, password}: Credentials): Observable<void> {
        return new Observable<void>(subscriber => {
            this.client.post<AuthResponseInterface, LoginData>(this.TOKEN_OBTAIN_URL, {
                username,
                password,
                grant_type: GrantTypes.PasswordGrantType,
                client_id: environment.client_id,
                client_secret: environment.client_secret
            }).subscribe(
                (result: AuthResponseInterface) => this.tokenManager.setTokens(result).then(
                    _ => {
                        subscriber.next();
                        subscriber.complete();
                    }
                ),
                (authError: HttpErrorResponse) => this.logout().subscribe(() => subscriber.error(authError))
            );
        });
    }

    public needToRefresh(): Observable<boolean> {
        return this.isAuthenticated$.pipe(first(), map(isAuth => !isAuth));
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
                    const refreshData: RefreshData = {refresh_token: refresh, grant_type: GrantTypes.RefreshGrantType};
                    this.client.post<AuthResponseInterface, RefreshData>(this.TOKEN_REFRESH_URL, refreshData).subscribe(
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
