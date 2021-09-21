import { Injectable } from '@angular/core';
import { Category } from '@app/api/models';
import { ProfessionalsService } from '@app/api/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DefaultCategoriesFactoryService {
  constructor(private readonly professionalsApi: ProfessionalsService) {}

  public getList(): Observable<Category[]> {
    return this.professionalsApi.professionalsCategoriesList({}).pipe(map(response => response.results));
  }
}
