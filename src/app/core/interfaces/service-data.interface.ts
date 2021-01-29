import { Service, ServiceTag } from '@app/api/models';

export default interface ServiceData {
  service: Service;
  tags?: ServiceTag[];
}
