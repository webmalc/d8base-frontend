/* eslint-disable max-classes-per-file */

import { ProfessionalContact } from '@app/api/models';

export class LoadAllProfessionalContacts {
  public static readonly type = '[ProfessionalContact] Load all professional contacts';
}

export class CreateProfessionalContact {
  public static readonly type = '[ProfessionalContact] Create new professional contact';

  constructor(public contact: ProfessionalContact) {}
}

export class UpdateProfessionalContact {
  public static readonly type = '[ProfessionalContact] Update professional contact';

  constructor(public contact: ProfessionalContact) {}
}

export class DeleteProfessionalContact {
  public static readonly type = '[ProfessionalContact] Delete professional contact';

  constructor(public contactId: ProfessionalContact['id']) {}
}
