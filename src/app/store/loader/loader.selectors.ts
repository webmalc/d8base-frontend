import { Selector } from '@ngxs/store';
import { LoaderStateModel } from './loader-state.model';
import { LoaderState } from './loader.state';

export default class LoaderSelectors {
  @Selector([LoaderState])
  public static isLoaderShown(data: LoaderStateModel): boolean {
    return Boolean(data.showLoader);
  }
}
