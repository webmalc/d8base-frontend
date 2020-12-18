import {Type} from '@angular/core';
import {ProfessionalList} from '@app/api/models/professional-list';
import {User} from '@app/core/models/user';
import {Service} from '@app/service/models/service';
import {StepComponent} from './abstract/step';
import {ClientDetailsStepComponent, DateTimeStepComponent, LocationStepComponent, SummaryStepComponent} from './components';
import {OrderClientDetailsFormFields} from './enums/order-client-details-form';

export interface StepModel {
    id: string;
    component: Type<StepComponent<any>>;
    title: string;
}

export interface StepsModel {
    byId: { [id: string]: StepModel };
    ids: string[];
}

export type StepContext = {
    professional: ProfessionalList;
    client: User;
    service: Service;
};

export type StepsState = {
    [K in keyof StepsModel['byId']]?: { [dateKey: string]: any };
};

export enum OrderIds {
    Date = 'date',
    Location = 'location',
    ClientDetails = 'client-details',
    Summary = 'summary'
}

export type DateTimeStepData = {
    start_datetime: string;
};

export type LocationStepData = {
    service_location: number;
    client_location: number;
};

export type ClientDetailsStepData = {
    [key in OrderClientDetailsFormFields]: string | boolean | number;
};

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
            title: 'order.step.date-time'
        },
        [OrderIds.Location]: {
            id: OrderIds.Location,
            component: LocationStepComponent,
            title: 'order.step.location'
        },
        [OrderIds.ClientDetails]: {
            id: OrderIds.ClientDetails,
            component: ClientDetailsStepComponent,
            title: 'order.step.client-details'
        },
        [OrderIds.Summary]: {
            id: OrderIds.Summary,
            component: SummaryStepComponent,
            title: 'order.step.summary'
        }
    },
    ids: [OrderIds.Date, OrderIds.ClientDetails, OrderIds.Location, OrderIds.Summary]
};

export const initState: StepsState = ORDER_STEPS.ids.reduce((acc, curr) => {
    return {...acc, [curr]: null};
}, {});

export const orderWizardStorageKey = 'orderWizardStorageKey';

export const stepsRoutes = (canActivate: any[]) =>
    Object.values(ORDER_STEPS.byId).map(({component, id}) => {
        return {
            path: `${id}`,
            pathMatch: 'full',
            canActivate,
            component
        };
    });
