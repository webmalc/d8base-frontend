/* eslint-disable max-classes-per-file */

import { AuthResponseInterface } from '@app/auth/interfaces/auth-response.interface';
import { DefaultRegisterUser, ProfessionalList, Profile, UserLocation, UserSettings } from '@app/api/models';

export class Initialize {
  public static readonly type = '[CurrentUser] Try to authorize using a saved token';
}

export class Login {
  public static readonly type = '[CurrentUser] User logs in using name and password';

  constructor(public credentials: { username: string; password: string }) {
  }
}

export class AuthenticateWithToken {
  public static readonly type = '[CurrentUser] User logs in using existing token data';

  constructor(public tokens: AuthResponseInterface) {
  }
}

export class RefreshTokens {
  public static readonly type = '[CurrentUser] Refresh authentication tokens';
}

export class LoadProfile {
  public static readonly type = '[CurrentUser] Load user profile';
}

export class LoadUserLocations {
  public static readonly type = '[CurrentUser] Load user locations';
}

export class LoadProfessionals {
  public static readonly type = '[CurrentUser] Load professionals list';
}

export class LoadSettings {
  public static readonly type = '[CurrentUser] Load user settings';
}

export class CreateProfessional {
  public static readonly type = '[CurrentUser] Add new professional to current user';

  constructor(public master: ProfessionalList) {
  }
}

export class Register {
  public static readonly type = '[CurrentUser] Register user with the provided data';

  constructor(public user: DefaultRegisterUser, public userData?: { location: UserLocation }) {
  }
}

export class Logout {
  public static readonly type = '[CurrentUser] User logs out';
}

export class ChangeUserSettings {
  public static readonly type = '[CurrentUser] User changes their settings';

  constructor(public changes: Partial<UserSettings>) {
  }
}

export class UpdateProfile {
  public static readonly type = '[CurrentUser] User changes their profile';

  constructor(public changes: Partial<Profile>) {
  }
}

export class CreateUserLocation {
  public static readonly type = '[CurrentUser] Create user location';

  constructor(public location: UserLocation) {
  }
}
