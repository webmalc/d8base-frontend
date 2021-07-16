import { Injectable } from '@angular/core';
import { Category } from '@app/api/models';
import { ProfessionalsService } from '@app/api/services';
import { ApiCache } from '@app/core/abstract/api-cache.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesApiCache extends ApiCache<Category> {
  constructor(private readonly professionalsService: ProfessionalsService) {
    super();
  }

  protected read(id: number): Observable<Category> {
    return this.professionalsService.professionalsCategoriesRead(id);
  }
}
