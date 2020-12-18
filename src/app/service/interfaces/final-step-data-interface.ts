import {ProfessionalList} from '@app/api/models/professional-list';
import {MasterLocation} from '@app/master/models/master-location';

export interface FinalStepDataInterface {
    master: ProfessionalList;
    masterLocation?: MasterLocation;
}
