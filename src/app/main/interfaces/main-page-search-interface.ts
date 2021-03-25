import { SearchLocationDataInterface } from '@app/main/interfaces/search-location-data-interface';
import { SearchFilterStateInterface } from '@app/search/interfaces/search-filter-state-interface';

export interface MainPageSearchInterface {
  needle: string;
  datetime: SearchFilterStateInterface['main']['datetime'];
  location: SearchLocationDataInterface;
}
