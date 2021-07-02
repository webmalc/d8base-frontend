import { Injectable } from '@angular/core';
import { Actions, ofActionCompleted, ofActionDispatched, ofActionErrored, Store } from '@ngxs/store';
import * as CurrentUserActions from '../current-user/current-user.actions';
import * as ProfessionalActions from '../professional-page/professional-page.actions';
import * as LoaderActions from './loader.actions';

const loaderActions = [CurrentUserActions.LoadProfile, ProfessionalActions.LoadProfessionalById];

@Injectable({ providedIn: 'root' })
export class LoaderEffects {
  constructor(actions$: Actions, store: Store) {
    actions$.pipe(ofActionDispatched(...loaderActions)).subscribe(action => {
      store.dispatch(new LoaderActions.ShowLoader(action.loaderKey));
    });

    actions$.pipe(ofActionCompleted(...loaderActions)).subscribe(({ action, result }) => {
      if (result.error) {
        console.error('result.error', result.error);
      }
      store.dispatch(new LoaderActions.HideLoader(action.loaderKey));
    });
  }
}
