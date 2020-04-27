import {HttpHeaders, HttpParams} from '@angular/common/http';
import {fakeAsync, flush, TestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {Observable, of} from 'rxjs';
import {AuthResponseInterface} from '../../auth/interfaces/auth-response.interface';
import {Credentials} from '../../auth/interfaces/credentials';
import {StorageManagerService} from '../proxies/storage-manager.service';
import {ApiClientService} from './api-client.service';
import {AuthenticationService} from './authentication.service';
import {TokenManagerService} from './token-manager.service';
import {StorageManagerMock} from './token-manager.service.spec';


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
        const service: AuthenticationService = TestBed.inject(AuthenticationService);
        expect(service).toBeTruthy();
    });

    it('test #login', (done) => {
        const service: AuthenticationService = TestBed.inject(AuthenticationService);

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
        const service: AuthenticationService = TestBed.inject(AuthenticationService);

        (service as any).tokenManager.setTokens({
            access_token: 'access_token',
            expires_in: 3600,
            token_type: 'Baerer',
            scope: 'read write groups',
            refresh_token: 'refresh_token'
        })
            .then(
                _ => {
                    service.isAuthenticated().subscribe(
                        res => {
                            expect(res).toBeTruthy();
                            done();
                        }
                    );
                }
            );
    });

    it('test #refresh', fakeAsync(() => {
        const service: AuthenticationService = TestBed.inject(AuthenticationService);

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
        const service: AuthenticationService = TestBed.inject(AuthenticationService);

        (service as any).tokenManager.setTokens({
            access_token: 'access_token',
            expires_in: 3600,
            token_type: 'Baerer',
            scope: 'read write groups',
            refresh_token: 'refresh_token'
        })
            .then(
                _ => {
                    service.logout().then(
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
        if (body.hasOwnProperty('refresh_token')) {
            return of({
                access_token: 'refreshedAccessToken',
                expires_in: 3600,
                token_type: 'Baerer',
                scope: 'read write groups',
                refresh_token: 'refreshedRefreshToken'
            });
        }

        return of({
            access_token: 'access_token',
            expires_in: 3600,
            token_type: 'Baerer',
            scope: 'read write groups',
            refresh_token: 'refresh_token'
        });
    }
}
