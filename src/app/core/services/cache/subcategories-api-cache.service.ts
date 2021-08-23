import { Injectable } from '@angular/core';
import { Subcategory } from '@app/api/models';
import { ProfessionalsService } from '@app/api/services';
import { ApiCache } from '@app/core/services/cache/api-cache.service';
import { Observable } from 'rxjs';

@Injectable()
export class SubcategoriesApiCache extends ApiCache<Subcategory> {
  constructor(private readonly professionalsService: ProfessionalsService) {
    super();
  }

  protected read(id: number): Observable<Subcategory> {
    return this.professionalsService.professionalsSubcategoriesRead(id);
  }
}
