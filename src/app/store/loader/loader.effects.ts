import { Injectable } from '@angular/core';
import { Actions, Store } from '@ngxs/store';
import { ActionContext, ActionStatus } from '@ngxs/store/src/actions-stream';
import { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as LoaderActions from './loader.actions';
import { LoaderAction } from './types/loader-action.type';

const ShowLoaderStatuses: ActionStatus[] = [ActionStatus.Dispatched];
const HideLoaderStatuses: ActionStatus[] = [ActionStatus.Successful, ActionStatus.Canceled, ActionStatus.Errored];

function ofShowLoaderAction(): OperatorFunction<ActionContext, any> {
  return function (o: Observable<ActionContext>) {
    return o.pipe(filterLoaderActionsStatus(ShowLoaderStatuses));
  };
}

function ofHideLoaderAction(): OperatorFunction<ActionContext, any> {
  return function (o: Observable<ActionContext>) {
    return o.pipe(filterLoaderActionsStatus(HideLoaderStatuses));
  };
}

function filterLoaderActionsStatus(allowedStatuses: ActionStatus[]) {
  return filter((ctx: ActionContext<LoaderAction>) => {
    const loaderTypeMatch = ctx.action?.loaderKey;
    const statusMatch = allowedStatuses.includes(ctx.status);
    return loaderTypeMatch && statusMatch;
  });
}
@Injectable({ providedIn: 'root' })
export class LoaderEffects {
  constructor(actions$: Actions, store: Store) {
    actions$.pipe(ofShowLoaderAction()).subscribe(({ action }) => {
      store.dispatch(new LoaderActions.ShowLoader(action.loaderKey));
    });

    actions$.pipe(ofHideLoaderAction()).subscribe(({ action }) => {
      store.dispatch(new LoaderActions.HideLoader(action.loaderKey));
    });
  }
}
