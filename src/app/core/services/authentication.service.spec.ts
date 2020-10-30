import {HttpHeaders, HttpParams} from '@angular/common/http';
import {fakeAsync, flush, TestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {AuthResponseInterface} from '@app/auth/interfaces/auth-response.interface';
import {Credentials} from '@app/auth/interfaces/credentials';
import {from, Observable, of} from 'rxjs';
import {StorageManagerMock} from 'src/testing/mocks';
import {StorageManagerService} from '../proxies/storage-manager.service';
import {ApiClientService} from './api-client.service';
import {AuthenticationService} from './authentication.service';
import {TokenManagerService} from './token-manager.service';


class HttpMock {
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
        if (body.hasOwnProperty('refresh_token')) {
            return of({
                access_token: 'refreshedAccessToken',
                expires_in: 3600,
                token_type: 'Bearer',
                scope: 'read write groups',
                refresh_token: 'refreshedRefreshToken'
            });
        }

        return of({
            access_token: 'access_token',
            expires_in: 3600,
            token_type: 'Bearer',
            scope: 'read write groups',
            refresh_token: 'refresh_token'
        });
    }
}

describe('AuthenticationService', () => {
    let service: AuthenticationService;

    beforeEach(() => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule,
            platformBrowserDynamicTesting());

        TestBed.configureTestingModule({
            providers: [
                {provide: StorageManagerService, useClass: StorageManagerMock},
                {provide: ApiClientService, useClass: HttpMock},
                TokenManagerService
            ]
        });

        service = TestBed.inject(AuthenticationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('test #login', (done) => {
        const credentials: Credentials = {
            username: 'test_user',
            password: 'test_pass'
        };
        service.login(credentials).subscribe(
            _ => {
                (service as any).tokenManager.getAccessToken().then(
                    token => {
                        expect(token).toEqual('access_token');
                        done();
                    }
                );
            }
        );
    });

    it('test #isAuthenticated', (done) => {
        service.authenticateWithToken({
            access_token: 'access_token',
            expires_in: 3600,
            token_type: 'Bearer',
            scope: 'read write groups',
            refresh_token: 'refresh_token'
        }).then(
            _ => ((service as any).tokenManager as any).needToRefresh().then(
                res => {
                    expect(res).toBeFalse();
                    done();
                }
            )
        );
    });

    it('test #refresh', fakeAsync(() => {
        from(service.authenticateWithToken({
            access_token: 'access_token',
            expires_in: 3600,
            token_type: 'Bearer',
            scope: 'read write groups',
            refresh_token: 'refresh_token'
        })).subscribe();
        flush();
        service.refresh().subscribe();
        flush();

        (service as any).tokenManager.getAccessToken().then(
            token => {
                expect(token).toEqual('refreshedAccessToken');
            }
        );
        (service as any).tokenManager.getRefreshToken().then(
            token => {
                expect(token).toEqual('refreshedRefreshToken');
            }
        );
    }));

    it('test #logout', (done) => {
        service.authenticateWithToken({
            access_token: 'access_token',
            expires_in: 3600,
            token_type: 'Baerer',
            scope: 'read write groups',
            refresh_token: 'refresh_token'
        })
            .then(
                _ => {
                    service.logout().subscribe(
                        () => {
                            (service as any).tokenManager.getAccessToken().then(
                                token => {
                                    expect(token).toBeUndefined();
                                    done();
                                }
                            );
                        }
                    );
                }
            );
    });
});
