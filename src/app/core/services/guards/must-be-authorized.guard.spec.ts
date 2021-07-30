import { TestBed } from '@angular/core/testing';

import { Router, UrlTree } from '@angular/router';
import { of } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { MustBeAuthorizedGuard } from './must-be-authorized.guard';

const redirectTargetUrl = 'redirect-target';
const routeMock: any = { snapshot: {} };
const routeStateMock: any = { snapshot: {}, url: redirectTargetUrl };

describe('MainGuard', () => {
  let guard: MustBeAuthorizedGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MustBeAuthorizedGuard,
        { provide: AuthenticationService, useValue: { isAuthenticated$: of(true) } },
        { provide: Router, useValue: { parseUrl: data => data } },
      ],
    });
  });

  it('should create', () => {
    guard = TestBed.inject(MustBeAuthorizedGuard);
    expect(guard).toBeTruthy();
  });
  it('test canActivate success', done => {
    TestBed.overrideProvider(AuthenticationService, { useValue: { isAuthenticated$: of(true) } });
    guard = TestBed.inject(MustBeAuthorizedGuard);
    guard.canActivate(routeMock, routeStateMock).subscribe(res => {
      expect(res).toBe(true);
      done();
    });
  });
  it('test canActivate login redirect', done => {
    TestBed.overrideProvider(AuthenticationService, { useValue: { isAuthenticated$: of(false) } });
    guard = TestBed.inject(MustBeAuthorizedGuard);
    guard.canActivate(routeMock, routeStateMock).subscribe((res: UrlTree) => {
      expect(res.toString()).toBe(`/auth/login?redirectTo=${redirectTargetUrl}`);
      done();
    });
  });
});
