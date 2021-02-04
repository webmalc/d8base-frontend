import { HTTP_INTERCEPTORS, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { of } from 'rxjs';
import { StorageManagerMock } from '../../../testing/mocks';
import { ApiClientService } from './api-client.service';
import { AuthInterceptor } from './auth-interceptor.service';
import { TokenManagerService } from './token-manager.service';

describe('AuthInterceptor', () => {

  let client: ApiClientService;
  let tokenManager: jasmine.SpyObj<TokenManagerService>;
  let service: AuthInterceptor;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    const spyTokenManager: jasmine.SpyObj<TokenManagerService> = jasmine.createSpyObj(
      'TokenManagerService', {
        needToRefresh: Promise.resolve(true),
        refresh: of(),
        getRefreshToken: Promise.resolve('refresh_token'),
        setTokens: Promise.resolve(true),
        getAccessToken: Promise.resolve('access_token'),
        clear: Promise.resolve(),
        isAccessTokenExpired: Promise.resolve(true),
        isRefreshTokenExpired: Promise.resolve(true),
      },
    );
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        {
          provide: TokenManagerService,
          useValue: spyTokenManager,
        },
        AuthInterceptor,
        { provide: StorageManagerService, useClass: StorageManagerMock },
      ],
    });

    client = TestBed.inject(ApiClientService);
    service = TestBed.inject(AuthInterceptor);
    tokenManager = TestBed.inject(TokenManagerService) as jasmine.SpyObj<TokenManagerService>;
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
