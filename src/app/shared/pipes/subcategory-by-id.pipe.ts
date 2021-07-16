import { Pipe } from '@angular/core';
import { Subcategory } from '@app/api/models';
import { SubcategoriesApiCache } from '@app/core/services/cache';
import { EntityById } from './entity-by-id';

@Pipe({
  name: 'subcategoryById$',
})
export class SubcategoryByIdPipe extends EntityById<Subcategory> {
  constructor(categoriesCache: SubcategoriesApiCache) {
    super();
    this.entityCache = categoriesCache;
  }
}
