import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StorageManagerService } from '@app/core/services/storage-manager.service';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from 'src/testing/mocks';

import { ApiClientService } from '../api/api-client.service';
import { AuthInterceptor } from './auth-interceptor.service';

describe('AuthInterceptor', () => {
  let client: ApiClientService;
  let service: AuthInterceptor;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...RootModules(), ComponentTestingModule],
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
