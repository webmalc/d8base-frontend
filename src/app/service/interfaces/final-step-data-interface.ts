import {Master} from '@app/core/models/master';
import {MasterLocation} from '@app/master/models/master-location';

export interface FinalStepDataInterface {
    master: Master;
    masterLocation?: MasterLocation;
}
