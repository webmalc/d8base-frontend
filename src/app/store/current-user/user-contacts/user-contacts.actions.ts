/* eslint-disable max-classes-per-file */

import { UserContact } from '@app/api/models';

export class LoadAllUserContacts {
  public static readonly type = '[UserContact] Load all user contacts';
}

export class CreateUserContact {
  public static readonly type = '[UserContact] Create new user contact';

  constructor(public contact: UserContact) {}
}

export class UpdateUserContact {
  public static readonly type = '[UserContact] Update user contact';

  constructor(public contact: UserContact) {}
}

export class DeleteUserContact {
  public static readonly type = '[UserContact] Delete user contact';

  constructor(public contactId: UserContact['id']) {}
}
