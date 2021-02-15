import { ProfessionalList, Profile, User, UserSettings } from '@app/api/models';
import { AuthResponseInterface } from '@app/auth/interfaces/auth-response.interface';
import { Selector } from '@ngxs/store';
import { CurrentUserStateModel } from './current-user-state.model';
import { CurrentUserState } from './current-user.state';

export class CurrentUserSelectors {
  @Selector([CurrentUserState])
  public static isMaster(data: CurrentUserStateModel): boolean {
    return data.profile?.account_type === 'professional';
  }

  @Selector([CurrentUserState])
  public static profile(data: CurrentUserStateModel): Profile | null {
    return data.profile;
  }

  @Selector([CurrentUserState])
  public static tokens(data: CurrentUserStateModel): AuthResponseInterface | null {
    return data.tokens;
  }

  @Selector([CurrentUserState])
  public static professional(data: CurrentUserStateModel): ProfessionalList | null {
    return data.professionals[0];
  }

  @Selector([CurrentUserState])
  public static settings(data: CurrentUserStateModel): UserSettings {
    return data.settings;
  }

  @Selector([CurrentUserState])
  public static errors(data: CurrentUserStateModel): string[] {
    return data.errors;
  }
}
