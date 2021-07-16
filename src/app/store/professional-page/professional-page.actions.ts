/* eslint-disable max-classes-per-file */

import { LoaderAction } from '../loader/types/loader-action.type';

export class LoadProfessionalById implements LoaderAction {
  public static readonly type = '[ProfessionalPage] Load professional by its id';
  public readonly loaderKey = LoadProfessionalById.type;

  constructor(public masterId: string) {}
}
