/* eslint-disable max-classes-per-file */

import { UserLanguage } from '@app/api/models';

export class LoadAllUserLanguages {
  public static readonly type = '[UserLanguage] Load all user languages';
}

export class LoadUserLanguage {
  public static readonly type = '[UserLanguage] Load user language';

  constructor(public id: UserLanguage['id']) {}
}

export class CreateUserLanguage {
  public static readonly type = '[UserLanguage] Add new user language';

  constructor(public userLanguage: UserLanguage) {}
}

export class UpdateUserLanguage {
  public static readonly type = '[UserLanguage] Update user language';

  constructor(public changes: Partial<UserLanguage>) {}
}

export class UpdateUserLanguagesList {
  public static readonly type = "[UserLanguage] Update user language's list";

  constructor(public newUserLanguages: UserLanguage[]) {}
}

export class DeleteUserLanguage {
  public static readonly type = '[UserLanguage] Delete user language';

  constructor(public id: UserLanguage['id']) {}
}
