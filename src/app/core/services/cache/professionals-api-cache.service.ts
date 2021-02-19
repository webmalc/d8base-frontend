import { Injectable } from '@angular/core';
import { ProfessionalList } from '@app/api/models';
import { ProfessionalsService } from '@app/api/services/professionals.service';
import { ApiCache } from '@app/core/abstract/api-cache.service';

@Injectable()
export class ProfessionalsApiCache extends ApiCache<ProfessionalList> {
  protected read = this.professionalsService.professionalsProfessionalsRead;

  constructor(private readonly professionalsService: ProfessionalsService) {
    super();
  }
}
