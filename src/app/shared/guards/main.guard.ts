import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenManagerService} from '../../core/auth/services/token-manager.service';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {

  constructor(private tokenManager: TokenManagerService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return new Observable<UrlTree | boolean>(subscriber => {
      this.tokenManager.refreshTokens().subscribe(
          next => {
            if (!next) {
              subscriber.next(this.router.parseUrl('/login'));
            } else {
              subscriber.next(true);
            }
            subscriber.complete();
          },
          _ => {
            subscriber.next(this.router.parseUrl('/login'));
            subscriber.complete();
          }
      );
    });
  }
}
