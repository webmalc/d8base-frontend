import { Pipe } from '@angular/core';
import { Category } from '@app/api/models';
import { CategoriesApiCache } from '@app/core/services/cache';
import { EntityById } from './entity-by-id';

@Pipe({
  name: 'categoryById$',
})
export class CategoryByIdPipe extends EntityById<Category> {
  constructor(categoriesCache: CategoriesApiCache) {
    super();
    this.entityCache = categoriesCache;
  }
}
