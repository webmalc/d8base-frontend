import { Injectable } from '@angular/core';
import { Actions, Store } from '@ngxs/store';
import { ActionContext, ActionStatus } from '@ngxs/store/src/actions-stream';
import { MonoTypeOperatorFunction, Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as LoaderActions from '@app/store/loader/loader.actions';
import { LoaderAction } from '@app/store/loader/types/loader-action.type';

const showLoaderStatuses: ActionStatus[] = [ActionStatus.Dispatched];
const hideLoaderStatuses: ActionStatus[] = [ActionStatus.Successful, ActionStatus.Canceled, ActionStatus.Errored];

function ofShowLoaderAction(): OperatorFunction<ActionContext, any> {
  return function (o: Observable<ActionContext>) {
    return o.pipe(filterLoaderActionsStatus(showLoaderStatuses));
  };
}

function ofHideLoaderAction(): OperatorFunction<ActionContext, any> {
  return function (o: Observable<ActionContext>) {
    return o.pipe(filterLoaderActionsStatus(hideLoaderStatuses));
  };
}

function filterLoaderActionsStatus(
  allowedStatuses: ActionStatus[],
): MonoTypeOperatorFunction<ActionContext<LoaderAction>> {
  return filter((ctx: ActionContext<LoaderAction>) => {
    const loaderTypeMatch = ctx.action?.loaderKey;
    const statusMatch = allowedStatuses.includes(ctx.status);
    return loaderTypeMatch && statusMatch;
  });
}

@Injectable()
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
