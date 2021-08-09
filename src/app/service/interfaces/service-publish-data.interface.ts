import {
  Price,
  ProfessionalLocation,
  ServiceList,
  ServiceLocation,
  ServicePhoto,
  ServiceSchedule,
} from '@app/api/models';
import { ProfessionalList } from '@app/api/models/professional-list';
import { MasterSchedule } from '@app/professional/models/master-schedule';

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
