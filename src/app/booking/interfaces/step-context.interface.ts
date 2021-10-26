import { ProfessionalList, Profile, ServiceList } from '@app/api/models';

export default interface StepContext {
  professional: ProfessionalList;
  client: Profile;
  service: ServiceList;
  isSelfOrder: boolean;
}
