import { ProfessionalLocation, ServiceList, ServicePhoto } from '@app/api/models';
import { ProfessionalList } from '@app/api/models/professional-list';
import { MasterSchedule } from '@app/professional/models/master-schedule';
import { Price } from '@app/service/models/price';
import { ServiceLocation } from '@app/service/models/service-location';
import { ServiceSchedule } from '@app/service/models/service-schedule';

export default interface ServicePublishData {
  master: ProfessionalList;
  service: Omit<ServiceList, 'professional'>;
  servicePhotos: ServicePhoto[];
  serviceSchedule: ServiceSchedule[];
  masterSchedule: MasterSchedule[];
  serviceLocation: ServiceLocation;
  masterLocation: ProfessionalLocation; // has empty 'id' if new
  servicePrice: Price;
}
