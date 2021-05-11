import { ProfessionalList, Profile, UserLocation, UserSettings } from '@app/api/models';
import { AuthResponseInterface } from '@app/auth/interfaces/auth-response.interface';

export interface CurrentUserStateModel {
  profile: Profile;
  tokens: AuthResponseInterface;
  professionals: ProfessionalList[];
  settings: UserSettings;

  errors: string[];
}
