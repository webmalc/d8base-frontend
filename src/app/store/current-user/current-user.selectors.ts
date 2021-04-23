import { ProfessionalList, Profile, UserLocation, UserSettings } from '@app/api/models';
import { AuthResponseInterface } from '@app/auth/interfaces/auth-response.interface';
import { defaultLocation } from '@app/store/current-user/current-user.constants';
import { Selector } from '@ngxs/store';
import { CurrentUserStateModel } from './current-user-state.model';
import { CurrentUserState, isAuthenticated } from './current-user.state';
import { Country } from '@app/api/models';

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
  public static userId(data: CurrentUserStateModel): Profile['id'] | null {
    return data.profile?.id;
  }

  @Selector([CurrentUserState])
  public static tokens(data: CurrentUserStateModel): AuthResponseInterface | null {
    return data.tokens;
  }

  @Selector([CurrentUserState])
  public static professionals(data: CurrentUserStateModel): ProfessionalList[] | null {
    return data.professionals;
  }

  @Selector([CurrentUserState])
  public static defaultProfessional(data: CurrentUserStateModel): ProfessionalList | null {
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
    return isAuthenticated(data);
  }

  @Selector([CurrentUserSelectors.defaultLocation])
  public static profileCountry(data: UserLocation): Country['id'] {
    return data?.country;
  }
}
