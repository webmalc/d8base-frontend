import { ProfessionalList, Profile } from '@app/api/models';
import { Service } from '@app/service/models/service';

export default interface StepContext {
  professional: ProfessionalList;
  client: Profile;
  service: Service;
}
