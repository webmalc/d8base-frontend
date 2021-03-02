import { ProfessionalList, Profile, UserLocation, UserSettings } from '@app/api/models';
import { AuthResponseInterface } from '@app/auth/interfaces/auth-response.interface';
import { defaultLocation } from '@app/store/current-user/current-user.constants';
import { Selector } from '@ngxs/store';
import { CurrentUserStateModel } from './current-user-state.model';
import { CurrentUserState } from './current-user.state';

export default class CurrentUserSelectors {
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
    return data.professionals?.[0] ?? null;
  }

  @Selector([CurrentUserState])
  public static defaultLocation(data: CurrentUserStateModel): UserLocation {
    return !data.locations ? null : data.locations[0] ?? defaultLocation;
  }

  @Selector([CurrentUserState])
  public static settings(data: CurrentUserStateModel): UserSettings {
    return data.settings;
  }

  @Selector([CurrentUserState])
  public static errors(data: CurrentUserStateModel): string[] {
    return data.errors;
  }

  @Selector([CurrentUserState])
  public static isAuthenticated(data: CurrentUserStateModel): boolean {
    const { tokens } = data;
    return Boolean(tokens.access_token);
  }
}
