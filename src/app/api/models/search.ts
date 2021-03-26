/* eslint-disable */
import { SearchProfessional } from './search-professional';
import { ServiceList } from './service-list';
export interface Search {
  professional?: SearchProfessional;
  services?: Array<ServiceList>;
}
