import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {TokenManagerService} from '@app/core/services/token-manager.service';

@Injectable({
    providedIn: 'root'
})
export class ApiClientService {

    constructor(
        private http: HttpClient,
        private tokenService: TokenManagerService,
        private authService: AuthenticationService
    ) { }

    public get(url: string): Observable<any > {
        return new Observable<any>((subscriber) => {
            this.http.get<any>(this.getHost() + url).subscribe(
                (responseData) => {
                    subscriber.next(responseData);
                    subscriber.complete();
                },
                (error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        this.authService.refresh().subscribe(
                            response => {
                                if (response) {
                                    this.http.get<any>(this.getHost() + url).subscribe(
                                        next => {
                                            subscriber.next(next);
                                            subscriber.complete();
                                        },
                                        err => {
                                            subscriber.error(err);
                                        }
                                    );
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
    }

    public post(url: string, data: object = {}): Observable<any> {
        return new Observable<any>((subscriber) => {
            this.http.post<any>(this.getHost() + url, JSON.stringify(data)).subscribe(
                (responseData) => {
                    subscriber.next(responseData);
                    subscriber.complete();
                },
                (error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        this.authService.refresh().subscribe(
                            response => {
                                if (response) {
                                    this.http.post<any>(this.getHost() + url, JSON.stringify(data)).subscribe(
                                        next => {
                                            subscriber.next(next);
                                            subscriber.complete();
                                        },
                                        err => {
                                            subscriber.error(err);
                                        }
                                    );
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
    }

    private getHost(): string {
        return environment.backend.url;
    }
}
