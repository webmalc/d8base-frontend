/* eslint-disable max-classes-per-file */

import { ProfessionalLocation } from '@app/api/models';

export class LoadAllProfessionalLocations {
  public static readonly type = '[ProfessionalLocation] Load all professional locations';
}

export class CreateProfessionalLocation {
  public static readonly type = '[ProfessionalLocation] Create new professional location';

  constructor(public location: ProfessionalLocation) {}
}

export class UpdateProfessionalLocation {
  public static readonly type = '[ProfessionalLocation] Update professional location';

  constructor(public location: ProfessionalLocation) {}
}

export class DeleteProfessionalLocation {
  public static readonly type = '[ProfessionalLocation] Delete professional location';

  constructor(public locationId: ProfessionalLocation['id']) {}
}
