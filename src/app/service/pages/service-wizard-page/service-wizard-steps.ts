import { Type } from '@angular/core';
import { CanActivate, Routes } from '@angular/router';
import {
  ServiceConditionsStepComponent,
  ServiceDetailsStepComponent,
  ServiceEssentialsStepComponent,
  ServiceSummaryStepComponent,
} from './components';
import { ServiceIds } from './enums/service-ids.enum';
import { StepModel } from './interfaces/step-model.interface';

/**
 * SERVICE_STEPS stores a configuration of service creation stepper-wizard.
 */
export const SERVICE_STEPS: StepModel[] = [
  {
    id: ServiceIds.Essentials,
    component: ServiceEssentialsStepComponent,
    title: 'service.step.essentials',
  },
  {
    id: ServiceIds.Details,
    component: ServiceDetailsStepComponent,
    title: 'service.step.details',
  },
  {
    id: ServiceIds.WhenAndWhere,
    component: ServiceConditionsStepComponent,
    title: 'service.step.time-and-place',
  },
  {
    id: ServiceIds.Summary,
    component: ServiceSummaryStepComponent,
    title: 'service.step.summary',
  },
];

export const stepsRoutes: (guards: Type<CanActivate>[]) => Routes = guards =>
  SERVICE_STEPS.map(({ component, id }, idx) => ({
    path: `${id}`,
    pathMatch: 'full',
    canActivate: [...(!idx ? [] : guards)],
    component,
  }));
