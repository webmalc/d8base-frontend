import { ServiceList } from '@app/api/models';
import { ProfessionalList } from '@app/api/models/professional-list';
import { MasterLocation } from '@app/master/models/master-location';
import { MasterSchedule } from '@app/master/models/master-schedule';
import { Price } from '@app/service/models/price';
import { ServiceLocation } from '@app/service/models/service-location';
import { ServicePhoto } from '@app/service/models/service-photo';
import { ServiceSchedule } from '@app/service/models/service-schedule';

export default interface ServicePublishData {
  master: ProfessionalList;
  service: Omit<ServiceList, 'professional'>;
  servicePhotos: ServicePhoto[];
  serviceSchedule: ServiceSchedule[];
  masterSchedule: MasterSchedule[];
  serviceLocation: ServiceLocation;
  masterLocation: MasterLocation;
  servicePrice: Price;
}
