/* eslint-disable max-classes-per-file */

import { Professional } from '@app/api/models';

export class LoadAllUserSavedProfessionals {
  public static readonly type = '[UserSavedProfessional] Load all user saved professionals';
}

export class CreateUserSavedProfessional {
  public static readonly type = '[UserSavedProfessional] Add new user saved professional';

  constructor(public professionalId: Professional['id']) {}
}

export class DeleteUserSavedProfessional {
  public static readonly type = '[UserSavedProfessional] Delete user saved professional';

  constructor(public professionalId: Professional['id']) {}
}
