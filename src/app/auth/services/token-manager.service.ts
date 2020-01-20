import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthResponseInterface} from '../interfaces/auth-response.interface';
import {HttpClient} from '@angular/common/http';
import {User} from '@app/shared/models/user';
import {AbstractAuthService} from './abstract-auth.service';
import {StorageManagerService} from '@app/core/services/storage-manager.service';

@Injectable({
    providedIn: 'root'
})
export class TokenManagerService extends AbstractAuthService {

    private readonly ACCESS_TOKEN_STORAGE_KEY = 'api_token';
    private readonly REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';

    private readonly TOKEN_OBTAIN_URL = environment.backend.api_auth_url;
    private readonly TOKEN_REFRESH_URL = environment.backend.api_refresh_url;

    public token: string = undefined;

    constructor(private storage: StorageManagerService, protected http: HttpClient) {
        super(http);
    }

    public async getToken(): Promise<string> {
        if (undefined !== this.token) {
            return this.token;
        }

        const token = await this.storage.get(this.ACCESS_TOKEN_STORAGE_KEY);

        return this.token = token;
    }

    public doAuth(user: User): Observable<boolean> {
        const data = {
            username: user.username,
            password: user.password
        };

        return new Observable<boolean>(
            (subscriber) => {
                this.auth(data, this.TOKEN_OBTAIN_URL).subscribe(
                    (response: AuthResponseInterface) => {
                        Promise.all([
                            this.setRefreshToken(response.refresh),
                            this.setToken(response.access)
                        ]).then(
                            _ => {
                                subscriber.next(true);
                                subscriber.complete();
                            }
                        );
                    },
                    error => {
                        subscriber.error(error);
                    }
                );
            }
        );
    }

    public refreshTokens(): Observable<boolean> {
        return new Observable<boolean>(
            (subscriber) => {
                this.getRefreshToken().then(refresh => {
                    this.auth({refresh}, this.TOKEN_REFRESH_URL).subscribe(
                        (response: AuthResponseInterface) => {
                            Promise.all([
                                this.setToken(response.access),
                                this.setRefreshToken(response.refresh)
                            ]).then(
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

    private auth(data: object, url): Observable<AuthResponseInterface> {
        return this.post(data, url) as Observable<AuthResponseInterface>;
    }

    private getRefreshToken(): Promise<any> {
        return this.storage.get(this.REFRESH_TOKEN_STORAGE_KEY);
    }

    private setRefreshToken(refresh: string): Promise<any> {
        return this.storage.set(this.REFRESH_TOKEN_STORAGE_KEY, refresh);
    }

    private setToken(token: string): Promise<any> {
        this.token = token;

        return this.storage.set(this.ACCESS_TOKEN_STORAGE_KEY, token);
    }
}
