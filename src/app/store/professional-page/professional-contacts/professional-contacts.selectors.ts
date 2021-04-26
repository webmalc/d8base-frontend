import { ProfessionalContact } from '@app/api/models';
import { Selector } from '@ngxs/store';
import { ProfessionalContactState, ProfessionalContactStateModel } from './professional-contacts.state';


export default class ProfessionalContactSelectors {
  @Selector([ProfessionalContactState])
  public static contacts(data: ProfessionalContactStateModel): ProfessionalContact[] {
    return data ?? [];
  }
}
