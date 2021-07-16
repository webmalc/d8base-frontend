import { ServiceIds } from '../enums/service-ids.enum';
import { StepModel } from './step-model.interface';

export interface StepsModel {
  byId: { [Id in Partial<ServiceIds>]: StepModel };
  ids: ServiceIds[];
}
