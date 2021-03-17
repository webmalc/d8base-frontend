import { UserSavedProfessional } from '@app/api/models';
import { Selector } from '@ngxs/store';
import { UserSavedProfessionalState, UserSavedProfessionalStateModel } from './saved-professionals.state';

export default class UserSavedProfessionalsSelectors {
  @Selector([UserSavedProfessionalState])
  public static professionalIds(data: UserSavedProfessionalStateModel): UserSavedProfessional['professional'][] {
    return data?.map(({ professional }) => professional);
  }
}
