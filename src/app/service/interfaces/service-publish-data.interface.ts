import {
  Price,
  ProfessionalLocation,
  ProfessionalSchedule,
  Profile,
  ServiceList,
  ServiceLocation,
  ServicePhoto,
  ServiceSchedule,
} from '@app/api/models';
import { ProfessionalList } from '@app/api/models/professional-list';

export default interface ServicePublishData {
  master: ProfessionalList;
  service: Omit<ServiceList, 'professional'>;
  servicePhotos: ServicePhoto[];
  serviceSchedule: ServiceSchedule[];
  masterSchedule: ProfessionalSchedule[];
  serviceLocation: ServiceLocation;
  masterLocation: ProfessionalLocation; // has empty 'id' if new
  servicePrice: Price;
  user: Profile;
}
