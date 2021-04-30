import { ProfessionalLocation } from '@app/api/models';
import { Selector } from '@ngxs/store';
import { ProfessionalLocationState, ProfessionalLocationStateModel } from './professional-locations.state';

export default class ProfessionalLocationSelectors {
  @Selector([ProfessionalLocationState])
  public static locations(data: ProfessionalLocationStateModel): ProfessionalLocation[] {
    return data ?? [];
  }
}
