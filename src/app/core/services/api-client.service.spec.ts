import { TestBed } from '@angular/core/testing';

import { ApiClientService } from './api-client.service';
import {StorageManagerService} from './storage-manager.service';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthResponseInterface} from '../../auth/interfaces/auth-response.interface';

describe('ApiClientService', () => {
  beforeEach(async () => TestBed.configureTestingModule({
    providers: [
      {provide: StorageManagerService, useClass: StorageManagerMock},
      {provide: HttpClient, useClass: HttpMock}
    ]
  }));

  it('should be created', () => {
    const service: ApiClientService = TestBed.get(ApiClientService);
    expect(service).toBeTruthy();
  });

  it('test #get',  async (done) => {
    const service: ApiClientService = TestBed.get(ApiClientService);

    expect(await (service as any).tokenService.getToken()).toBe('outdatedToken');

    service.get('/testUrl').subscribe(
        async (output: HttpResponse<string>) => {
          expect(output.status).toBe(200);
          expect(await (service as any).tokenService.getToken()).toBe('refreshedAccessToken');
          done();
        }
    );
  });

  it('test #post', async (done) => {
    const service: ApiClientService = TestBed.get(ApiClientService);
    await (service as any).tokenService.setAccessToken('outdatedToken');
    expect(await (service as any).tokenService.getToken()).toBe('outdatedToken');

    service.post('/testUrl', {test: 'data'}).subscribe(
        async (output: HttpResponse<string>) => {
          expect(output.status).toBe(200);
          expect(await (service as any).tokenService.getToken()).toBe('refreshedAccessToken');
          done();
        }
    );
  });
});

export class StorageManagerMock {

  private data: object = {
    api_token: 'outdatedToken',
    refresh_token: 'refreshToken'
  };

  public get(storageKey: string): Promise<any> {
    return Promise.resolve(this.data[storageKey]);
  }

  public set(storageKey: string, data: any): Promise<any> {
    this.data[storageKey] = data;

    return Promise.resolve(this.data[storageKey]);
  }
}

export class HttpMock {

  public get(url: string, options?: {
    headers: HttpHeaders;
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    return this.mock(options);
  }

  public post(url: string, body: any | null, options?: {
    headers: HttpHeaders;
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<AuthResponseInterface> {
    if (JSON.parse(body).hasOwnProperty('refresh')) {
      return new Observable<AuthResponseInterface>(subscriber => {
        subscriber.next({access: 'refreshedAccessToken'});
        subscriber.complete();
      });
    } else {
      return this.mock(options);
    }
  }

  private mock(options?: {headers: HttpHeaders}): Observable<AuthResponseInterface> {
    if (options.headers.get('Authorization') === 'Bearer outdatedToken') {
      return new Observable<any>(subscriber => {
        subscriber.error(new HttpResponse({status: 401, statusText: 'Unauthorized'}));
        subscriber.complete();
      });
    } else {
      return new Observable<any>(subscriber => {
        subscriber.next(new HttpResponse({status: 200, statusText: 'OK'}));
        subscriber.complete();
      });
    }
  }
}
