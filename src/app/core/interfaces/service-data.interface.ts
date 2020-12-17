import {Service} from '@app/service/models/service';
import {ServiceTag} from '@app/service/models/service-tag';

export default interface ServiceData {
    service: Service;
    tags?: ServiceTag[];
}
