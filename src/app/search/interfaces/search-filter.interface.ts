import { SearchService } from '@app/api/services';

export interface SearchFilter {
  name?: [keyof SearchService.SearchListParams];
  value?: any;
}
