import { TestBed } from '@angular/core/testing';

import { Router, UrlTree } from '@angular/router';
import { of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { MainGuard } from './main.guard';

describe('MainGuard', () => {
  let guard: MainGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MainGuard,
        { provide: AuthenticationService, useValue: { isAuthenticated$: of(true) } },
        { provide: Router, useValue: { parseUrl: (data) => data } },
      ],
    });
  });

  it('should create', () => {
    guard = TestBed.inject(MainGuard);
    expect(guard).toBeTruthy();
  });
  it('test canActivate success', (done) => {
    TestBed.overrideProvider(AuthenticationService, { useValue: { isAuthenticated$: of(true) } });
    guard = TestBed.inject(MainGuard);
    guard.canActivate().subscribe(
      res => {
        expect(res).toBe(true);
        done();
      },
    );
  });
  it('test canActivate login redirect', (done) => {
    TestBed.overrideProvider(AuthenticationService, { useValue: { isAuthenticated$: of(false) } });
    guard = TestBed.inject(MainGuard);
    guard.canActivate().subscribe(
      (res: UrlTree) => {
        expect(res.toString()).toBe('/auth/login');
        done();
      },
    );
  });
});
