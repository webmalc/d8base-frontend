import {TestBed} from '@angular/core/testing';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {ApiClientService} from './api-client.service';
import {AuthInterceptor} from './auth-interceptor.service';
import {TokenManagerService} from './token-manager.service';
import {AuthResponseInterface} from '../../auth/interfaces/auth-response.interface';
import {environment} from '../../../environments/environment';
import {LocationApiService} from './location/location-api.service';
import {UserManagerService} from './user-manager.service';

describe('AuthInterceptor', () => {

    let client: jasmine.SpyObj<ApiClientService>;
    let tokenManager: jasmine.SpyObj<TokenManagerService>;
    let service: AuthInterceptor;
    let httpMock: HttpTestingController;
    // let api: ApiClientService;

    beforeEach(() => {
        const spyClient = jasmine.createSpyObj(
            'ApiClientService', {
                post: (url: string, data: object = {}) => {
                    const authData: AuthResponseInterface = {
                        access: 'access_token',
                        refresh: 'refresh_token'
                    };

                    return of(authData);
                }
            }
        );
        const spyTokenManager = jasmine.createSpyObj(
            'TokenManagerService', {
                needToRefresh: () => new Promise(resolve => resolve(true)),
                refresh: () => of(),
                getRefreshToken: () => Promise.resolve('refresh_token')
            }
        );
        TestBed.configureTestingModule({
            imports: [
                // RouterTestingModule,
                // HttpTestingController,
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
        // location = TestBed.get(LocationApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be created', () => {
        tokenManager.needToRefresh.and.returnValue(Promise.resolve(true));
        tokenManager.getRefreshToken.and.returnValue(Promise.resolve('refresh_token'));
        const q: UserManagerService = TestBed.get(UserManagerService);
        q.getUser().subscribe();
        const httpRequest = httpMock.expectOne(environment.backend.url + environment.backend.get_user_data_url);

        // expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
        expect(tokenManager.getRefreshToken).toHaveBeenCalled();
    });
});
