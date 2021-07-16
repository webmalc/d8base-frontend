/**
 * SERVICE_STEPS stores a configuration of service creation stepper-wizard.
 *
 * The "byId" field stores information about steps.
 *
 * The "ids" field sets the order of steps.
 */

import { Type } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CategoryServiceStepComponent } from './components/category-step/category-step.component';
import { ServiceDetailsStepComponent } from './components/service-details-step/service-details-step.component';
import { ServiceInfoStepComponent } from './components/service-info-step/service-info-step.component';
import { ServiceIds } from './enums/service-ids.enum';
import { StepsModel } from './interfaces/steps-model.interface';
import { ServiceStepsState } from './interfaces/steps-state.type';

export const SERVICE_STEPS: StepsModel = {
  byId: {
    [ServiceIds.Category]: {
      id: ServiceIds.Category,
      component: CategoryServiceStepComponent,
      title: 'service.step.category',
    },
    [ServiceIds.Info]: {
      id: ServiceIds.Info,
      component: ServiceInfoStepComponent,
      title: 'service.step.info',
    },
    [ServiceIds.Details]: {
      id: ServiceIds.Details,
      component: ServiceDetailsStepComponent,
      title: 'service.step.info',
    },
  },
  ids: [ServiceIds.Category, ServiceIds.Info, ServiceIds.Details],
};

export const initState: ServiceStepsState = SERVICE_STEPS.ids.reduce((acc, curr) => ({ ...acc, [curr]: null }), {});

export const serviceWizardStorageKey = 'serviceWizardStorageKey';

export const stepsRoutes = (guards: Type<CanActivate>[]) =>
  Object.values(SERVICE_STEPS.byId).map(({ component, id }, idx) => ({
    path: `${id}`,
    pathMatch: 'full',
    canActivate: [...(!idx ? [] : guards)],
    component,
  }));
