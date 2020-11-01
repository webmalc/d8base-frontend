import {TestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {AuthResponseInterface} from '@app/auth/interfaces/auth-response.interface';
import {ErrorList} from '@app/core/enums/error-list';
import {StorageManagerMock} from 'src/testing/mocks';
import {StorageManagerService} from '../proxies/storage-manager.service';
import {TokenManagerService} from './token-manager.service';

describe('TokenManagerService', () => {

    const tokenData: AuthResponseInterface = {
        access_token: 'access_token',
        expires_in: 5,
        token_type: 'Baerer',
        scope: 'read write groups',
        refresh_token: 'refresh_token'
    };

    beforeEach(() => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule,
            platformBrowserDynamicTesting());
    });

    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {provide: StorageManagerService, useClass: StorageManagerMock}
        ]
    }));

    it('should be created', () => {
        const service: TokenManagerService = TestBed.inject(TokenManagerService);

        expect(service).toBeTruthy();
    });

    it('test #setTokens', (done) => {
        const service: TokenManagerService = TestBed.inject(TokenManagerService);

        service.setTokens(tokenData).then(
            _ => {
                (service as any).storage.get('api_token_data').then(token => {
                    expect(token).toEqual(jasmine.objectContaining(tokenData)); // can have more fields
                    done();
                });
            }
        );
    });

    it('test #getAccessToken', (done) => {
        const service: TokenManagerService = TestBed.inject(TokenManagerService);

        service.setTokens(tokenData).then(
            _ => {
                service.getAccessToken().then(
                    token => {
                        expect(token).toEqual('access_token');
                        done();
                    }
                );
            }
        );
    });

    it('test #getRefreshToken', (done) => {
        const service: TokenManagerService = TestBed.inject(TokenManagerService);

        service.setTokens(tokenData).then(
            _ => {
                service.getRefreshToken().then(
                    token => {
                        expect(token).toEqual('refresh_token');
                        done();
                    }
                );
            }
        );
    });

    it('test #clear', (done) => {
        const service: TokenManagerService = TestBed.inject(TokenManagerService);

        service.setTokens(tokenData).then(
            _ => {
                service.clear().then(
                    () => {
                        service.getAccessToken().catch(err => expect(err).toEqual(Error(ErrorList.EMPTY_TOKEN_ERROR)));
                        service.getRefreshToken().catch(err => expect(err).toEqual(Error(ErrorList.EMPTY_TOKEN_ERROR)));
                        done();
                    }
                );
            }
        );
    });
});
