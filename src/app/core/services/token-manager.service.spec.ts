import {TestBed} from '@angular/core/testing';

import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {AuthResponseInterface} from '../../auth/interfaces/auth-response.interface';
import {JwtHelper} from '../proxies/jwt-helper.service';
import {StorageManagerService} from '../proxies/storage-manager.service';
import {TokenManagerService} from './token-manager.service';

describe('TokenManagerService', () => {

    beforeEach(() => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule,
            platformBrowserDynamicTesting());
    });

    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {provide: StorageManagerService, useClass: StorageManagerMock},
            JwtHelper
        ]
    }));

    it('should be created', () => {
        const service: TokenManagerService = TestBed.get(TokenManagerService);

        expect(service).toBeTruthy();
    });

    it('test #setTokens', (done) => {
        const service: TokenManagerService = TestBed.get(TokenManagerService);

        const data: AuthResponseInterface = {
            access: 'test-access',
            refresh: 'test-refresh'
        };

        service.setTokens(data).then(
            _ => {
                (service as any).storage.get('api_token').then(token => {
                    expect(token).toEqual('test-access');
                    done();
                });
                (service as any).storage.get('refresh_token').then(token => {
                    expect(token).toEqual('test-refresh');
                    done();
                });
            }
        );
    });

    it('test #getAccessToken',  (done) => {
        const service: TokenManagerService = TestBed.get(TokenManagerService);

        (service as any).setAccessToken('test').then(
            _ => {
                service.getAccessToken().then(
                    token => {
                        expect(token).toEqual('test');
                        done();
                    }
                );
            }
        );
    });

    it('test #getRefreshToken',  (done) => {
        const service: TokenManagerService = TestBed.get(TokenManagerService);

        (service as any).setRefreshToken('test').then(
            _ => {
                service.getRefreshToken().then(
                    token => {
                        expect(token).toEqual('test');
                        done();
                    }
                );
            }
        );
    });

    it('test #clear',  (done) => {
        const service: TokenManagerService = TestBed.get(TokenManagerService);

        const data: AuthResponseInterface = {
            access: 'test-access',
            refresh: 'test-refresh'
        };

        service.setTokens(data).then(
            _ => {
                service.clear().then(
                    () => {
                        service.getAccessToken().then(
                            token => {
                                expect(token).toEqual(null);
                                done();
                            }
                        );
                        service.getRefreshToken().then(
                            token => {
                                expect(token).toEqual(null);
                                done();
                            }
                        );
                    }
                );
            }
        );
    });

    it('test #isAccessTokenExpired',  (done) => {
        const service: TokenManagerService = TestBed.get(TokenManagerService);

        (service as any).setAccessToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIj' +
            'oxNTc5ODY4Mjk0LCJqdGkiOiI0MjBmNGQwMmE1OTQ0YmE1YTY0NTNjZmIwZDAxNWM3NiIsInVzZXJfaWQiOjN9.4uxWZj6kRHeqi_' +
            'xv1fGac58a3xrQCtdK7mhnSDYHnqE'
        ).then(
            _ => {
                service.isAccessTokenExpired().then(
                    bool => {
                        expect(bool).toBeTruthy();
                        done();
                    }
                );
            }
        );
    });

});

export class StorageManagerMock {

    private data: object = {
        api_token: null,
        refresh_token: null
    };

    public get(storageKey: string): Promise<any> {
        return Promise.resolve(this.data[storageKey]);
    }

    public set(storageKey: string, data: any): Promise<any> {
        this.data[storageKey] = data;

        return Promise.resolve(this.data[storageKey]);
    }

    public remove(storageKey: string): Promise<any> {
        this.data[storageKey] = null;

        return Promise.resolve();
    }
}
