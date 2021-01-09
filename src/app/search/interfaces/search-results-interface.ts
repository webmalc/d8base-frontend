import { ProfessionalList } from '@app/api/models/professional-list';
import { MasterLocation } from '@app/master/models/master-location';
import { Service } from '@app/service/models/service';

export interface SearchResultsInterface {
    master: ProfessionalList;
    masterLocationList?: MasterLocation[];
    services: Service[];
}
