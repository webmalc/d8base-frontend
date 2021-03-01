import { Price, ServiceList } from '@app/api/models';

export interface StepTwoDataInterface {
  name: string;
  description: string;
  duration: number;
  price: Price;
  service_type: ServiceList['service_type'];
}
