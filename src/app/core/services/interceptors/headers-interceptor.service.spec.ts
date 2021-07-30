import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { ApiClientService } from '../api/api-client.service';
import { HeadersInterceptor } from './headers-interceptor.service';

describe('HeadersInterceptor', () => {
  let client: jasmine.SpyObj<ApiClientService>;
  let service: HeadersInterceptor;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...RootModules(), ComponentTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HeadersInterceptor,
          multi: true,
        },
        HeadersInterceptor,
      ],
    });

    client = TestBed.inject(ApiClientService) as jasmine.SpyObj<ApiClientService>;
    service = TestBed.inject(HeadersInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
