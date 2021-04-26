/* eslint-disable max-classes-per-file */

import { AuthResponseInterface } from '@app/auth/interfaces/auth-response.interface';
import { DefaultRegisterUser, ProfessionalList, Profile, UserContact, UserLocation, UserSettings } from '@app/api/models';

export class Initialize {
  public static readonly type = '[CurrentUser] Try to authorize using a saved token';
}

export class Login {
  public static readonly type = '[CurrentUser] User logs in using name and password';

  constructor(public credentials: { username: string; password: string }) {}
}

export class AuthenticateWithToken {
  public static readonly type = '[CurrentUser] User logs in using existing token data';

  constructor(public tokens: AuthResponseInterface) {}
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

export class SaveSettings {
  public static readonly type = '[CurrentUser] Save user settings';

  constructor(public newSettings: Partial<UserSettings>) {}
}
export class RestoreSettingsLocal {
  public static readonly type = '[CurrentUser] Restore from storage user settings';
}

export class StoreSettingsLocal {
  public static readonly type = '[CurrentUser] Store to storage user settings';

  constructor(public newSettings: Partial<UserSettings>) {}
}

export class CreateProfessional {
  public static readonly type = '[CurrentUser] Add new professional to current user';

  constructor(public master: ProfessionalList) {}
}

export class Register {
  public static readonly type = '[CurrentUser] Register user with the provided data';

  constructor(public user: DefaultRegisterUser, public userData?: { location: UserLocation }) {}
}

export class Logout {
  public static readonly type = '[CurrentUser] User logs out';
}

export class ChangeUserSettings {
  public static readonly type = '[CurrentUser] Change user settings';

  constructor(public changes: Partial<UserSettings>) {}
}

export class UpdateProfile {
  public static readonly type = '[CurrentUser] Change user profile';

  constructor(public changes: Partial<Profile>) {}
}

export class CreateUserLocation {
  public static readonly type = '[CurrentUser] Create user location';

  constructor(public location: UserLocation) {}
}
export class CreateUserContact {
  public static readonly type = '[CurrentUser] Create user contact';

  constructor(public сontact: UserContact) {}
}
export class DeleteUserContact {
  public static readonly type = '[CurrentUser] Delete user contact';

  constructor(public id: UserContact['id']) {}
}
export class UpdateUserContact {
  public static readonly type = '[CurrentUser] Update user contact';

  constructor(public сontact: Partial<UserContact>) {}
}
