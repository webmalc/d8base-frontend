import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ApiClientService} from './api-client.service';
import {AuthInterceptor} from './auth-interceptor.service';
import {TokenManagerService} from './token-manager.service';

describe('AuthInterceptor', () => {

    let client: jasmine.SpyObj<ApiClientService>;
    let tokenManager: jasmine.SpyObj<TokenManagerService>;
    let service: AuthInterceptor;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        const spyTokenManager = jasmine.createSpyObj(
            'TokenManagerService', {
                needToRefresh: () => new Promise(resolve => resolve(true)),
                refresh: () => of(),
                getRefreshToken: () => Promise.resolve('refresh_token'),
                setTokens: () => Promise.resolve(true)
            }
        );
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true
                },
                {
                    provide: TokenManagerService,
                    useValue: spyTokenManager
                },
                AuthInterceptor
            ]
        });

        client = TestBed.get(ApiClientService);
        service = TestBed.get(AuthInterceptor);
        tokenManager = TestBed.get(TokenManagerService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should save new tokens if access token has expired', fakeAsync(() => {
        tokenManager.needToRefresh.and.returnValue(Promise.resolve(true));
        tokenManager.getRefreshToken.and.returnValue(Promise.resolve('refresh_token'));
        tokenManager.setTokens.and.returnValue(Promise.resolve(true));

        client.get('/test/').subscribe();
        tick();
        httpMock.expectOne(environment.backend.url + environment.backend.refresh)
            .flush({access: 'test', refresh: 'test2'});
        tick();
        expect(tokenManager.setTokens).toHaveBeenCalledWith({access: 'test', refresh: 'test2'});
    }));

    it('should not refresh if access token hasnt expired', fakeAsync(() => {
        tokenManager.needToRefresh.and.returnValue(Promise.resolve(false));
        tokenManager.getRefreshToken.and.returnValue(Promise.resolve('refresh_token'));
        tokenManager.setTokens.and.returnValue(Promise.resolve(true));

        client.get('/test/').subscribe();
        tick();
        expect(tokenManager.setTokens).not.toHaveBeenCalled();
    }));
});
