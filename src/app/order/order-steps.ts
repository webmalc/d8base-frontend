import { Type } from '@angular/core';
import { CanActivate, Routes } from '@angular/router';
import { ClientDetailsStepComponent } from '@app/order//components/client-details-step/client-details-step.component';
import { SummaryStepComponent } from '@app/order//components/summary-step/summary-step.component';
import { DateTimeStepComponent } from '@app/order/components/date-time-step/date-time-step.component';
import { LocationStepComponent } from '@app/order/components/location-step/location-step.component';
import StepsModel from '@app/order/interfaces/steps-model.interface';
import { OrderIds } from './enums/order-ids.enum';
import { StepsState } from './interfaces/steps-state.type';

/**
 * ORDER_STEPS stores a configuration of order creation stepper-wizard.
 *
 * The "byId" field stores information about steps.
 *
 * The "ids" field sets the order of steps.
 */

export const ORDER_STEPS: StepsModel = {
  byId: {
    [OrderIds.Date]: {
      id: OrderIds.Date,
      component: DateTimeStepComponent,
      title: 'order.step.date-time',
    },
    [OrderIds.ClientDetails]: {
      id: OrderIds.ClientDetails,
      component: ClientDetailsStepComponent,
      needGuards: true,
      title: 'order.step.client-details',
    },
  },
  ids: [OrderIds.Date, OrderIds.ClientDetails],
};

export const initState: StepsState = ORDER_STEPS.ids.reduce((acc, curr) => ({ ...acc, [curr]: null }), {});

export const orderWizardStorageKey = 'orderWizardStorageKey';

export const stepsRoutes: (guards: Type<CanActivate>[]) => Routes = guards =>
  Object.values(ORDER_STEPS.byId).map(({ component, needGuards, id }) => ({
    path: `${id}`,
    pathMatch: 'full',
    canActivate: needGuards ? guards : null,
    component,
  }));
