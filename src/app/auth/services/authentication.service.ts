import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {TokenManagerService} from '@app/auth/services/token-manager.service';
import {AuthResponseInterface} from '@app/auth/interfaces/auth-response.interface';
import {User} from '@app/shared/models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private readonly TOKEN_OBTAIN_URL = environment.backend.api_auth_url;
    private readonly TOKEN_REFRESH_URL = environment.backend.api_refresh_url;
    private readonly GET_USER_DATA_URL = environment.backend.get_user_data_url;

    constructor(private http: HttpClient, private tokenManager: TokenManagerService) {
    }

    public static getAuthUrls(): Array<string> {
        return [
            environment.backend.url + environment.backend.api_auth_url,
            environment.backend.url + environment.backend.api_register_url,
            environment.backend.url + environment.backend.api_password_recovery_url
        ];
    }

    public login(credentials: {username: string, password: string }): Observable<void> {
        return new Observable<void>(subscriber => {
            this.post(credentials, this.TOKEN_OBTAIN_URL).subscribe(
                (result: AuthResponseInterface) => {
                    this.get(this.GET_USER_DATA_URL).subscribe(
                        userData => {
                            //user data to storage
                            this.tokenManager.setTokens(result).then(
                                _ => {
                                    subscriber.next();
                                    subscriber.complete();
                                }
                            );
                        },
                        (incorrectTokenError: HttpErrorResponse) => {
                            subscriber.error(incorrectTokenError);
                        }
                    );
                },
                (authError: HttpErrorResponse) => {
                    subscriber.error(authError);
                }
            );
        });
    }

    public refresh(): Observable<boolean> {
        return new Observable<boolean>(
            (subscriber) => {
                this.tokenManager.getRefreshToken().then(refresh => {
                    this.post({refresh}, this.TOKEN_REFRESH_URL).subscribe(
                        (response: AuthResponseInterface) => {
                            this.tokenManager.setTokens(response).then(
                                _ => {
                                    subscriber.next(true);
                                    subscriber.complete();
                                }
                            ).catch(
                                _ => subscriber.error(false)
                            );
                        },
                        _ => {
                            subscriber.error(false);
                        }
                    );
                });
            }
        );
    }

    public isAuthenticated(): Promise<boolean> {
        return this.tokenManager.isAccessTokenExpired();
    }

    public logout(): Promise<any> {
        return this.tokenManager.clear();
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
