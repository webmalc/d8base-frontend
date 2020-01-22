import { TestBed, inject } from '@angular/core/testing';

import { MainGuard } from './main.guard';
import {Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenManagerService} from '../services/token-manager.service';

describe('MainGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          MainGuard,
          { provide: TokenManagerService, useClass: TokenManagerMock },
          { provide: Router, useClass: RouterMock }
      ]
    });
  });

  it('should ...', inject([MainGuard], (guard: MainGuard) => {
    expect(guard).toBeTruthy();
  }));
  it('test canActivate success', inject([MainGuard], (guard: MainGuard) => {
    guard.canActivate().subscribe(
        res => {
          expect(res).toBe(true);
        }
    );
  }));
  it('test canActivate login redirect', inject([MainGuard], (guard: MainGuard) => {
    (guard as any).tokenManager.counter = 1;
    guard.canActivate().subscribe(
        (res: UrlTree) => {
          expect(res.toString()).toBe('/auth/login');
        }
    );
  }));
});


export class TokenManagerMock {
  public counter = 0;

  public refreshTokens(): Observable<boolean> {
    return new Observable<boolean>(
        subscriber => {
          if (!this.counter) {
            subscriber.next(true);
          } else {
            subscriber.next(false);
          }
          subscriber.complete();
        }
    );
  }

}

export class RouterMock {
  public parseUrl(data: any) {
    return data;
  }
}
