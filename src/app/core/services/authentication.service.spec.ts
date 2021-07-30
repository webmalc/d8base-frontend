import { TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { AuthResponseInterface } from '@app/auth/interfaces/auth-response.interface';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { StorageManagerMock } from 'src/testing/mocks';
import { StorageManagerService } from '../proxies/storage-manager.service';
import { ApiClientService } from './api/api-client.service';
import { AuthenticationService } from './authentication.service';

class HttpMock {
  public post(url: string, body: any | null): Observable<AuthResponseInterface> {
    if (body.hasOwnProperty('refresh_token')) {
      return of({
        access_token: 'refreshedAccessToken',
        expires_in: 3600,
        token_type: 'Bearer',
        scope: 'read write groups',
        refresh_token: 'refreshedRefreshToken',
      });
    }

    return of({
      access_token: 'access_token',
      expires_in: 3600,
      token_type: 'Bearer',
      scope: 'read write groups',
      refresh_token: 'refresh_token',
    });
  }
}

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

    TestBed.configureTestingModule({
      providers: [
        { provide: ApiClientService, useClass: HttpMock },
        { provide: StorageManagerService, useClass: StorageManagerMock },
      ],
    });

    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(
    'test #isAuthenticated',
    waitForAsync(done => {
      service.authenticateWithToken({
        access_token: 'access_token',
        expires_in: 3600,
        token_type: 'Bearer',
        scope: 'read write groups',
        refresh_token: 'refresh_token',
      });
      service.isAuthenticated$.pipe(first(x => !!x)).subscribe(() => {
        done();
      });
    }),
  );
});
