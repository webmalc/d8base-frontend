/* eslint-disable max-classes-per-file */

import { AuthResponseInterface } from '@app/core/interfaces/auth-response.interface';
import {
  DefaultRegisterUser,
  ProfessionalList,
  Profile,
  UserLocation,
  UserSettings,
  VerifyEmail,
} from '@app/api/models';
import { LoaderAction } from '../loader/types/loader-action.type';

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

export class LoadProfile implements LoaderAction {
  public static readonly type = '[CurrentUser] Load user profile';
  public readonly loaderKey = LoadProfile.type;
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

export class ChangeUserSettingsLanguage {
  public static readonly type = '[CurrentUser] Change user settings language';

  constructor(public newLanguage: UserSettings['language']) {}
}

export class UpdateProfile {
  public static readonly type = '[CurrentUser] Change user profile';

  constructor(public changes: Partial<Profile>) {}
}

export class RegisterNewEmail {
  public static readonly type = '[CurrentUser] Register new email';

  constructor(public newEmail: Profile['email']) {}
}

export class ResendEmailVerification {
  public static readonly type = '[CurrentUser] Resend email verification';
}

export class VerifyEmailAction {
  public static readonly type = '[CurrentUser] Verify email';

  constructor(public verifyEmail: VerifyEmail) {}
}

export class UpdateAvatar {
  public static readonly type = '[CurrentUser] Update Avatar';

  constructor(public avatar: Profile['avatar']) {}
}
