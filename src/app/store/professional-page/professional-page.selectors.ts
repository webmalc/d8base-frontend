import { ProfessionalList } from '@app/api/models';
import { Selector } from '@ngxs/store';
import ProfessionalPageStateModel from './professional-page-state.model';
import { ProfessionalPageState } from './professional-page.state';

export default class ProfessionalPageSelectors {
  @Selector([ProfessionalPageState])
  public static context(data: ProfessionalPageStateModel): ProfessionalPageStateModel {
    return data;
  }

  @Selector([ProfessionalPageState])
  public static professional(data: ProfessionalPageStateModel): ProfessionalList {
    return data?.professional;
  }
}
