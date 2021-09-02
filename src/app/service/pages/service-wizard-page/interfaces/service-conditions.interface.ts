import { Service, ServiceLocation, ServiceSchedule } from '@app/api/models';

export interface ServiceConditionsInterface {
  schedule: ServiceSchedule[];
  is_base_schedule: boolean;
  service_type: Service['service_type'];
  location: ServiceLocation;
}
