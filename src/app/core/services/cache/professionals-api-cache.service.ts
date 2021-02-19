import { Injectable } from '@angular/core';
import { ProfessionalList } from '@app/api/models';
import { ProfessionalsService } from '@app/api/services/professionals.service';
import { ApiCache } from '@app/core/abstract/api-cache.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProfessionalsApiCache extends ApiCache<ProfessionalList> {
  constructor(private readonly professionalsService: ProfessionalsService) {
    super();
  }

  protected read(id: number): Observable<ProfessionalList> {
    return this.professionalsService.professionalsProfessionalsRead(id);
  }
}
