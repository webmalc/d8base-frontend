import { Injectable } from '@angular/core';
import { Category } from '@app/core/models/category';
import { CategoriesApiService } from '@app/core/services/categories-api.service';

@Injectable()
export class DefaultCategoriesFactoryService {

  private list: Category[];

  constructor(private readonly categoryApi: CategoriesApiService) {
    this.categoryApi.get().subscribe(res => this.list = res.results);
  }

  public getByName(name: string): Category | null {
    const cat = this.list.find(el => el.code === name);

    return cat === undefined ? null : cat;
  }
}
