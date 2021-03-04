import { ProfessionalList, UserExtended } from '@app/api/models';

export default interface ProfessionalPageStateModel {
  user?: UserExtended;
  master?: ProfessionalList;
  canEdit?: boolean;
}
