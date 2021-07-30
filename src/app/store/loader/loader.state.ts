import { Injectable } from '@angular/core';
import { LoaderEffects } from '@app/core/services/facades/loader.effects';
import { Action, State, StateContext } from '@ngxs/store';
import { LoaderStateModel } from './loader-state.model';
import * as LoaderActions from './loader.actions';
import { defaultLoaderState } from './loader.constants';

@State<LoaderStateModel>({
  name: 'Loader',
  defaults: defaultLoaderState,
})
@Injectable()
export class LoaderState {
  constructor(public readonly loaderEffects: LoaderEffects) {}
  @Action(LoaderActions.ShowLoader)
  public showLoader(
    { setState, getState }: StateContext<LoaderStateModel>,
    { loaderKeyToShow }: LoaderActions.ShowLoader,
  ): void {
    if (!loaderKeyToShow) {
      return;
    }

    const { loaderKeys } = getState();
    const newLoaderKeys = loaderKeys.concat(loaderKeyToShow);
    setState({ loaderKeys: newLoaderKeys, showLoader: newLoaderKeys.length });
  }

  @Action(LoaderActions.HideLoader)
  public hideLoader(
    { setState, getState }: StateContext<LoaderStateModel>,
    { loaderKeyToHide }: LoaderActions.HideLoader,
  ): void {
    if (!loaderKeyToHide) {
      return;
    }

    const newLoaderKeys = [...getState().loaderKeys];
    const indexToHide = newLoaderKeys.indexOf(loaderKeyToHide);
    if (indexToHide >= 0) {
      newLoaderKeys.splice(indexToHide, 1);
    }
    setState({ loaderKeys: newLoaderKeys, showLoader: newLoaderKeys.length });
  }
}
