import {Injectable} from '@angular/core';
import {StorageManagerService} from '../../../shared/services/storage-manager.service';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {UserModel} from '../../shared/models/user.model';
import {AuthResponseInterface} from '../interfaces/auth-response.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TokenManagerService {

    private readonly ACCESS_TOKEN_STORAGE_KEY = 'api_token';
    private readonly REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';

    private readonly TOKEN_OBTAIN_URL = environment.backend.api_auth_url;
    private readonly TOKEN_REFRESH_URL = environment.backend.api_refresh_url;

    public token: string = undefined;

    constructor(private storage: StorageManagerService, private http: HttpClient) { }

    public async getToken(): Promise<string> {
        // console.log(this.token);
        if (undefined !== this.token) {
            return this.token;
        }

        const token = await this.storage.get(this.ACCESS_TOKEN_STORAGE_KEY);

        return this.token = token;
    }

    public doAuth(user: UserModel): Observable<boolean> {
        const data = {
            username: user.username,
            password: user.password
        };

        return new Observable<boolean>(
            (subscriber) => {
                this.auth(data, this.TOKEN_OBTAIN_URL).subscribe(
                    async (response: AuthResponseInterface) => {
                        await this.setRefreshToken(response.refresh);
                        await this.setToken(response.access);

                        subscriber.next(true);
                        subscriber.complete();
                    },
                    error => {
                        subscriber.error(false);
                    }
                );
            }
        );
    }

    public refreshToken(): Observable<boolean> {
        return new Observable<boolean>(
            (subscriber) => {
                this.getRefreshToken().then(refresh => {
                    this.auth({refresh}, this.TOKEN_REFRESH_URL).subscribe(
                        (response: AuthResponseInterface) => {
                            this.setToken(response.access).then(
                                res => {
                                    subscriber.next(true);
                                    subscriber.complete();
                                }
                            );
                        },
                        error => {
                            subscriber.error(false);
                        }
                    );
                });
            }
        );
    }

    private auth(data: object, url): Observable<AuthResponseInterface> {
        const headers = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post<AuthResponseInterface>(this.getHost() + url, JSON.stringify(data), headers);
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

    private getHost(): string {
        return environment.backend.url;
    }
}
