import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {AuthResponseInterface} from '@app/auth/interfaces/auth-response.interface';
import {Credentials} from '@app/auth/interfaces/credentials';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {AuthenticatorInterface} from '@app/core/interfaces/authenticator.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements AuthenticatorInterface{

    private readonly TOKEN_OBTAIN_URL = environment.backend.api_auth_url;
    private readonly TOKEN_REFRESH_URL = environment.backend.api_refresh_url;

    constructor(private http: HttpClient, private tokenManager: TokenManagerService) {
    }

    public login(credentials: Credentials): Observable<void> {
        return new Observable<void>(subscriber => {
            this.post(credentials, this.TOKEN_OBTAIN_URL).subscribe(
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
        return new Promise<boolean>(resolve => {
            this.tokenManager.isAccessTokenExpired().then(
                isAccessTokenExpired => {
                    if (isAccessTokenExpired) {
                        this.tokenManager.isRefreshTokenExpired().then(
                            isRefreshTokenExpired => {
                                if (!isRefreshTokenExpired) {
                                    resolve(true);
                                }
                            }
                        );
                    }
                }
            );
        });
    }

    public refresh(): Observable<void> {
        return new Observable<void>(
            (subscriber) => {
                this.tokenManager.getRefreshToken().then(refresh => {
                    this.post({refresh}, this.TOKEN_REFRESH_URL).subscribe(
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

    private get(url: string): Observable<any> {
        return this.http.get<any>(this.getHost() + url);
    }

    private post(data: object, url): Observable<object> {
        return this.http.post(this.getHost() + url, JSON.stringify(data));
    }

    private getHost(): string {
        return environment.backend.url;
    }
}
