import { ServiceList } from '@app/api/models';
import { ProfessionalList } from '@app/api/models/professional-list';
import { MasterLocation } from '@app/master/models/master-location';

export interface SearchResultsInterface {
  master: ProfessionalList;
  masterLocationList?: MasterLocation[];
  services: ServiceList[];
}
