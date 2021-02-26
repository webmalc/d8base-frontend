import { UserLanguage } from '@app/api/models';
import { Selector } from '@ngxs/store';
import { UserLanguageState, UserLanguageStateModel } from './user-language.state';

export default class UserLanguagesSelectors {
  @Selector([UserLanguageState])
  public static entities(data: UserLanguageStateModel): UserLanguage[] {
    const { ids, byId } = data;
    return ids?.map(id => byId[id]);
  }

  @Selector([UserLanguageState])
  public static keys(data: UserLanguageStateModel): number[] {
    return data.ids;
  }

  @Selector([UserLanguageState])
  public static size(data: UserLanguageStateModel): number {
    return data.ids?.length;
  }
}
