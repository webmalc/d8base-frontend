import { Service, ServiceLocation, ProfessionalLocation } from '@app/api/models';

export default interface LocationSelectorContext {
  initialLocation: ServiceLocation;
  professionalLocations: ProfessionalLocation[];
  service: Service;
}
