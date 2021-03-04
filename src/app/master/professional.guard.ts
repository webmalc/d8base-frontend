import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Profile } from '@app/api/models';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable()
export class ProfessionalGuard implements CanActivate {

  @Select(CurrentUserSelectors.defaultProfessional)
  public defaultProfessional$: Observable<Profile>;

  constructor(private readonly router: Router) {
  }

  public canActivate(): Observable<boolean | UrlTree> {
    return this.defaultProfessional$.pipe(
      first(x => !!x),
      map(professional => this.router.parseUrl(`/professional/${professional.id}`)),
    );
  }
}
