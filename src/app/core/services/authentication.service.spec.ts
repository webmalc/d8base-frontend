import {TestBed} from '@angular/core/testing';
import {AuthenticationService} from './authentication.service';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthResponseInterface} from '../../auth/interfaces/auth-response.interface';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {StorageManagerMock} from './token-manager.service.spec';
import {TokenManagerService} from './token-manager.service';
import {ApiClientService} from './api-client.service';
import {Credentials} from '../../auth/interfaces/credentials';
import {StorageManagerService} from '../proxies/storage-manager.service';


describe('AuthenticationService', () => {

    beforeEach(() => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule,
            platformBrowserDynamicTesting());
    });

    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {provide: StorageManagerService, useClass: StorageManagerMock},
            {provide: ApiClientService, useClass: HttpMock},
            TokenManagerService
        ]
    }));

    it('should be created', () => {
        const service: AuthenticationService = TestBed.get(AuthenticationService);
        expect(service).toBeTruthy();
    });

    it('test #login', (done) => {
        const service: AuthenticationService = TestBed.get(AuthenticationService);

        const credentials: Credentials = {
            username: 'test_user',
            password: 'test_pass'
        };
        service.login(credentials).subscribe(
            _ => {
                (service as any).tokenManager.getAccessToken().then(
                    token => {
                        expect(token).toEqual('AccessToken');
                        done();
                    }
                );
            }
        );
    });

    it('test #isAuthenticated', (done) => {
        const service: AuthenticationService = TestBed.get(AuthenticationService);

        (service as any).tokenManager.setAccessToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIj' +
            'oxNTc5ODY4Mjk0LCJqdGkiOiI0MjBmNGQwMmE1OTQ0YmE1YTY0NTNjZmIwZDAxNWM3NiIsInVzZXJfaWQiOjN9.4uxWZj6kRHeqi_' +
            'xv1fGac58a3xrQCtdK7mhnSDYHnqE')
            .then(
                _ => {
                    service.isAuthenticated().then(
                        res => {
                            expect(res).toBeFalsy();
                            done();
                        }
                    );
                }
            );
    });

    it('test #logout', (done) => {
        const service: AuthenticationService = TestBed.get(AuthenticationService);

        (service as any).tokenManager.setTokens({access: 'access', refresh: 'refresh'})
            .then(
                _ => {
                    service.logout().then(
                        () => {
                            (service as any).tokenManager.getAccessToken().then(
                                token => {
                                    expect(token).toBeNull();
                                    done();
                                }
                            );
                        }
                    );
                }
            );
    });

    it('test #refresh', (done) => {
        const service: AuthenticationService = TestBed.get(AuthenticationService);

        service.refresh().subscribe(
            _ => {
                (service as any).tokenManager.getAccessToken().then(
                    token => {
                        expect(token).toEqual('refreshedAccessToken');
                        done();
                    }
                );
                (service as any).tokenManager.getRefreshToken().then(
                    token => {
                        expect(token).toEqual('refreshedRefreshToken');
                        done();
                    }
                );
            }
        );
    });

});


export class HttpMock {
    public post(url: string, body: any | null, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<AuthResponseInterface> {
        if (body.hasOwnProperty('refresh')) {
            return new Observable<AuthResponseInterface>(subscriber => {
                subscriber.next({access: 'refreshedAccessToken', refresh: 'refreshedRefreshToken'});
                subscriber.complete();
            });
        } else {
            return new Observable<AuthResponseInterface>(subscriber => {
                subscriber.next({access: 'AccessToken', refresh: 'RefreshToken'});
                subscriber.complete();
            });
        }
    }
}
