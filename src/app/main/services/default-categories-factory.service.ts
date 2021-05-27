import { Injectable } from '@angular/core';
import { Category } from '@app/api/models';
import { ProfessionalsService } from '@app/api/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DefaultCategoriesFactoryService {
  private list: Category[];

  constructor(private readonly professionalsApi: ProfessionalsService) {
    this.professionalsApi.professionalsCategoriesList({}).subscribe(res => (this.list = res.results));
  }

  public getList(): Observable<Category[]> {
    return this.professionalsApi
    .professionalsCategoriesList({ codeIsnull: `${false}` })
    .pipe(map(response => response.results));
  }

  public getByName(name: string): Category | null {
    const cat = this.list.find(el => el.code === name);

    return cat === undefined ? null : cat;
  }
}
