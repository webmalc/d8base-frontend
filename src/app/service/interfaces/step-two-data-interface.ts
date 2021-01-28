import { Price } from '@app/api/models';

export interface StepTwoDataInterface {
  name: string;
  description: string;
  duration: number;
  price: Price;
  service_type: string;
}
