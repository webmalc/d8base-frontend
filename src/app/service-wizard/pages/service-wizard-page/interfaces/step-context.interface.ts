import { Category, Subcategory } from '@app/api/models';
import { ServiceIds } from '../enums/service-ids.enum';

export interface ServiceStepContext {
  [ServiceIds.Category]?: { category: Category; subcategory: Subcategory };
}
