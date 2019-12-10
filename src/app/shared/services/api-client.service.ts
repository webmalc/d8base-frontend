import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';
import {TokenManagerService} from '../../core/auth/services/token-manager.service';

@Injectable({
    providedIn: 'root'
})
export class ApiClientService {

    constructor(private http: HttpClient, private tokenService: TokenManagerService) { }

    public get(url: string): Observable<any > {
        return new Observable<any>((subscriber) => {
            this.getApiHeaders().then((headers: object) => {
                console.log(headers);
                this.http.get<any>(this.getHost() + url, headers).subscribe(
                    (responseData) => {
                        subscriber.next(responseData);
                        subscriber.complete();
                    },
                     (error: HttpErrorResponse) => {
                        if (error.status === 401) {
                            this.tokenService.refreshTokens().subscribe(
                                response => {
                                    if (response) {
                                        this.getApiHeaders().then((refreshedHeaders: object) => {
                                            this.http.get<any>(this.getHost() + url, refreshedHeaders).subscribe(
                                                next => {
                                                    subscriber.next(next);
                                                    subscriber.complete();
                                                },
                                                err => {
                                                    subscriber.error(err);
                                                }
                                            );
                                        });
                                    } else {
                                        subscriber.error(response);
                                    }
                                },
                                errorRefresh => {
                                    subscriber.error(errorRefresh);
                                }
                            );
                        } else {
                            subscriber.error(error);
                        }
                    }
                );
            });
        });
    }

    public post(url: string, data: object = {}): Observable<any> {
        return new Observable<any>((subscriber) => {
            this.getApiHeaders().then((headers: object) => {
                this.http.post<any>(this.getHost() + url, JSON.stringify(data), headers).subscribe(
                    (responseData) => {
                        subscriber.next(responseData);
                        subscriber.complete();
                    },
                    (error: HttpErrorResponse) => {
                        if (error.status === 401) {
                            this.tokenService.refreshTokens().subscribe(
                                response => {
                                    if (response) {
                                        this.getApiHeaders().then((refreshedHeaders: object) => {
                                            this.http.post<any>(this.getHost() + url, JSON.stringify(data), refreshedHeaders).subscribe(
                                                next => {
                                                    subscriber.next(next);
                                                    subscriber.complete();
                                                },
                                                err => {
                                                    subscriber.error(err);
                                                }
                                            );
                                        });
                                    } else {
                                        subscriber.error(error);
                                    }
                                },
                                errorRefresh => {
                                    subscriber.error(errorRefresh);
                                }
                            );
                        } else {
                            subscriber.error(error);
                        }
                    }
                );
            });
        });
    }

    private getHost(): string {
        return environment.backend.url;
    }

    private async getApiHeaders(): Promise<{headers: HttpHeaders}> {
        return { headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + await this.tokenService.getToken()
            })
        };
    }
}
