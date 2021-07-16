import { Type } from '@angular/core';
import { ServiceStepComponent } from '../components/step/step';
import { ServiceIds } from '../enums/service-ids.enum';

export interface StepModel {
  id: ServiceIds;
  component: Type<ServiceStepComponent<any>>;
  title: string;
}
