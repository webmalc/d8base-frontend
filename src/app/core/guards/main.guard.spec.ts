import {TestBed} from '@angular/core/testing';

import {Router, UrlTree} from '@angular/router';
import {of} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {MainGuard} from './main.guard';

describe('MainGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MainGuard,
                {provide: AuthenticationService, useValue: {isAuthenticated : () => of(true)} },
                {provide: Router, useValue: {parseUrl: (data) => data}}
            ]
        });
    });

    it('should ...', () => {
        const guard = TestBed.get(MainGuard);
        expect(guard).toBeTruthy();
    });
    it('test canActivate success', (done) => {
        const guard = TestBed.get(MainGuard);
        spyOn((((guard as any).authFactory) as any).mainAuthenticator, 'isAuthenticated').and.returnValue(of(true));
        guard.canActivate().subscribe(
            res => {
                expect(res).toBe(true);
                done();
            }
        );
    });
    it('test canActivate login redirect', (done) => {
        const guard = TestBed.get(MainGuard);
        spyOn((((guard as any).authFactory) as any).mainAuthenticator, 'isAuthenticated').and.returnValue(of(false));
        guard.canActivate().subscribe(
            (res: UrlTree) => {
                expect(res.toString()).toBe('/auth/login');
                done();
            }
        );
    });
});
