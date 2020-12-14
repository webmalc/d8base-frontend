import { Type } from '@angular/core';
import { User } from '../core/models/user';
import { MasterList } from '../master/models/master-list';
import { Service } from '../service/models/service';
import { StepComponent } from './abstract/step';
import {
    ClientDetailsStepComponent,
    DateTimeStepComponent,
    LocationStepComponent,
    SummaryStepComponent
} from './components';
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

export type StepState<T extends any> = {
    isComplete: boolean;
    data: T;
};

export type StepContext = {
    professional: MasterList;
    client: User;
    service: Service;
};

export type StepsState = {
    [K in keyof StepsModel['byId']]?: StepState<any>;
};

export enum OrderIds {
    Date = 'Date',
    Location = 'Location',
    ClientDetails = 'ClientDetails',
    Summary = 'Summary'
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
    ids: [
        OrderIds.Date,
        OrderIds.ClientDetails,
        OrderIds.Location,
        OrderIds.Summary
    ]
};

export const orderWizardStorageKey = 'orderWizardStorageKey';

export const stepsRoutes = (canActivate: any[]) =>
    Object.values(ORDER_STEPS.byId).map(({ component, id }) => {
        return {
            path: `${id}`,
            pathMatch: 'full',
            canActivate,
            component
        };
    });
