/* eslint-disable max-classes-per-file */

export class LoadProfessionalById {
  public static readonly type = '[ProfessionalPage] Load professional by its id';

  constructor(public masterId: string) {
  }
}
