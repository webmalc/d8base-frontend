import { ServiceTag } from '@app/api/models';

export interface ServiceDetailsInterface {
  description: string;
  photos: File[];
  tags: ServiceTag[];
}
