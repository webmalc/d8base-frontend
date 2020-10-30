import {MasterList} from '@app/master/models/master-list';
import {MasterLocation} from '@app/master/models/master-location';
import {Service} from '@app/service/models/service';

export interface SearchResultsInterface {
    master: MasterList;
    masterLocationList?: MasterLocation[];
    services: Service[];
}
