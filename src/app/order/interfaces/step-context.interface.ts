import { ProfessionalList } from '@app/api/models';
import { User } from '@app/core/models/user';
import { Service } from '@app/service/models/service';

export default interface StepContext {
  professional: ProfessionalList;
  client: User;
  service: Service;
}
