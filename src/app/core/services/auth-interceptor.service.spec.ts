import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { StorageManagerMock } from '../../../testing/mocks';
import { ApiClientService } from './api-client.service';
import { AuthInterceptor } from './auth-interceptor.service';

describe('AuthInterceptor', () => {
  let client: ApiClientService;
  let service: AuthInterceptor;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        AuthInterceptor,
        { provide: StorageManagerService, useClass: StorageManagerMock },
      ],
    });

    client = TestBed.inject(ApiClientService);
    service = TestBed.inject(AuthInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
