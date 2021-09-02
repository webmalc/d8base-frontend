import { Type } from '@angular/core';
import { StepComponent } from '../components/step/step';
import { ServiceIds } from '../enums/service-ids.enum';

export interface StepModel {
  id: ServiceIds;
  component: Type<StepComponent<any>>;
  title: string;
}
