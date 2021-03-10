import { Pipe } from '@angular/core';
import { ProfessionalList } from '@app/api/models';
import { ProfessionalsApiCache } from '@app/core/services/cache';
import { EntityById } from './entity-by-id';

@Pipe({
  name: 'masterById$',
})
export class MasterByIdPipe extends EntityById<ProfessionalList> {
  constructor(professionalsCache: ProfessionalsApiCache) {
    super();
    this.entityCache = professionalsCache;
  }
}
