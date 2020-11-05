import {WizardStep} from '@app/shared/types';
import {DateTimeStepComponent, PlaceStepComponent, SummaryStepComponent} from './components';

export const orderSteps: WizardStep[] = [
    {
        path: '1',
        title: 'order.date-time',
        component: DateTimeStepComponent
    },
    {
        path: '2',
        title: 'order.place',
        component: PlaceStepComponent
    },
    {
        path: '3',
        title: 'order.summary',
        component: SummaryStepComponent
    }
];
