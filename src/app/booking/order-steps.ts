import { Type } from '@angular/core';
import { CanActivate, Routes } from '@angular/router';
import { ClientDetailsStepComponent } from '@app/booking/components/client-details-step/client-details-step.component';
import { ConfirmationStepComponent } from '@app/booking/components/confirmation-step/confirmation-step.component';
import { DateTimeStepComponent } from '@app/booking/components/date-time-step/date-time-step.component';
import StepsModel from '@app/booking/interfaces/steps-model.interface';
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
    [OrderIds.date]: {
      id: OrderIds.date,
      component: DateTimeStepComponent,
      title: 'order.step.date-time',
    },
    [OrderIds.confirmation]: {
      id: OrderIds.confirmation,
      component: ConfirmationStepComponent,
      title: 'order.step.confirmation',
    },
    [OrderIds.clientDetails]: {
      id: OrderIds.clientDetails,
      component: ClientDetailsStepComponent,
      needGuards: true,
      title: 'order.step.client-details',
    },
  },
  ids: [OrderIds.date, OrderIds.confirmation, OrderIds.clientDetails],
};

export const initState: StepsState = ORDER_STEPS.ids.reduce((acc, curr) => ({ ...acc, [curr]: null }), {});

export const orderWizardStorageKey = 'recent_order_details';

export const stepsRoutes: (guards: Type<CanActivate>[]) => Routes = guards =>
  Object.values(ORDER_STEPS.byId).map(({ component, needGuards, id }) => ({
    path: `${id}`,
    pathMatch: 'full',
    canActivate: needGuards ? guards : null,
    component,
  }));
