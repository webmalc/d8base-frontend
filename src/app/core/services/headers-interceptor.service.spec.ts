import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiClientService } from './api-client.service';
import { HeadersInterceptor } from './headers-interceptor.service';

describe('HeadersInterceptor', () => {

  let client: jasmine.SpyObj<ApiClientService>;
  let service: HeadersInterceptor;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
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
