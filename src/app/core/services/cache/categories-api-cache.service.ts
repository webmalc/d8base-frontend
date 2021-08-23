import { Injectable } from '@angular/core';
import { Category } from '@app/api/models';
import { ProfessionalsService } from '@app/api/services';
import { ApiCache } from '@app/core/services/cache/api-cache.service';
import { Observable } from 'rxjs';

@Injectable()
export class CategoriesApiCache extends ApiCache<Category> {
  constructor(private readonly professionalsService: ProfessionalsService) {
    super();
  }

  protected read(id: number): Observable<Category> {
    return this.professionalsService.professionalsCategoriesRead(id);
  }
}
