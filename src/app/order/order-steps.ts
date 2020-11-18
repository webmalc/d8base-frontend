import {WizardStep} from '@app/shared/types';
import {DateTimeStepComponent, LocationStepComponent, SummaryStepComponent} from './components';

export const orderSteps: WizardStep[] = [
    {
        path: '1',
        title: 'order.date-time',
        component: DateTimeStepComponent
    },
    {
        path: '2',
        title: 'order.location',
        component: LocationStepComponent
    },
    {
        path: '3',
        title: 'order.summary',
        component: SummaryStepComponent
    }
];
