import {Type} from '@angular/core';
import {CanActivate} from '@angular/router';
import {StepComponent} from '../abstract/step';

export default interface StepModel {
    id: string;
    component: Type<StepComponent<any>>;
    canActivate?: Type<CanActivate>[];
    title: string;
}
