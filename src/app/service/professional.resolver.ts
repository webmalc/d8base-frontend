import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfessionalList } from '@app/api/models';
import { Store } from '@ngxs/store';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { first } from 'rxjs/operators';

@Injectable()
export class ProfessionalResolver implements Resolve<ProfessionalList> {
  constructor(private readonly store: Store) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<ProfessionalList> {
    return this.store.select(CurrentUserSelectors.defaultProfessional).pipe(first(x => !!x));
  }
}
