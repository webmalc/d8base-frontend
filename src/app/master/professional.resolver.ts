import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import ProfessionalPageStateModel from '@app/store/professional-page/professional-page-state.model';
import * as ProfessionalActions from '@app/store/professional-page/professional-page.actions';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalResolver implements Resolve<ProfessionalPageStateModel> {
  constructor(private readonly store: Store) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<ProfessionalPageStateModel> {
    const id = route.paramMap.get('master-id');
    return this.store.dispatch(new ProfessionalActions.LoadProfessionalById(id));
  }
}
