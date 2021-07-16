import { Service, ServicePhoto } from '@app/api/models';

export interface ServiceDetailsInterface {
  description: Service['description'];
  photos: Partial<ServicePhoto>[];
}
