import { ProfessionalList, Profile, UserSettings } from '@app/api/models';
import { AuthResponseInterface } from '@app/core/interfaces/auth-response.interface';

export interface CurrentUserStateModel {
  profile: Profile;
  tokens: AuthResponseInterface;
  professionals: ProfessionalList[];
  settings: UserSettings;

  errors: string[];
}
