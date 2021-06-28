import { Service } from '@app/api/models';

export interface ServiceInfoInterface {
  name: Service['name'];
  price: Service['price'];
  duration: Service['duration'];
}
