import {Type} from '@angular/core';
import {StepComponent} from '../abstract/step';

export default interface StepModel {
    id: string;
    component: Type<StepComponent<any>>;
    needGuards?: boolean;
    title: string;
}
