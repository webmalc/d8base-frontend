import { Price, Service } from '@app/api/models';

export interface ServiceEssentialsInterface {
  name: Service['name'];
  duration: Service['duration'];
  price: Omit<Service['price'], 'payment_methods'>;
  payment_methods: Price['payment_methods'];
}
