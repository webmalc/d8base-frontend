import { TestBed } from '@angular/core/testing';

import { TokenManagerService } from './token-manager.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {StorageManagerService} from '../../../shared/services/storage-manager.service';
import {Observable} from 'rxjs';
import {AuthResponseInterface} from '../interfaces/auth-response.interface';
import {UserModel} from '../../shared/models/user.model';

describe('TokenManagerService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: StorageManagerService, useClass: StorageManagerMock},
      {provide: HttpClient, useClass: HttpMock}
    ]
  }));

  it('should be created', () => {
    const service: TokenManagerService = TestBed.get(TokenManagerService);

    expect(service).toBeTruthy();
  });

  it('#doAuth should return true, #getToken should return `AccessToken`', (done) => {
    const service: TokenManagerService = TestBed.get(TokenManagerService);

    const userModel = new UserModel();
    userModel.password = 'pass';
    userModel.username = 'uname';

    service.doAuth(userModel).subscribe(
        async (authResult) => {
          expect(authResult).toBe(true);
          expect(await service.getToken()).toBe('AccessToken');
          expect(await (service as any).getRefreshToken()).toBe('RefreshToken');
          service.refreshToken().subscribe(
              async (refreshRes) => {
                expect(refreshRes).toBe(true);
                expect(await service.getToken()).toBe('refreshedAccessToken');
                expect(await (service as any).getRefreshToken()).toBe('refreshedRefreshToken');
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
}

export class HttpMock {
  public post(url: string, body: any | null, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
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
        subscriber.next({access: 'refreshedAccessToken', refresh: 'refreshedRefreshToken'});
        subscriber.complete();
      });
    } else {
      return new Observable<AuthResponseInterface>(subscriber => {
        subscriber.next({access: 'AccessToken', refresh: 'RefreshToken'});
        subscriber.complete();
      });
    }
  }
}
