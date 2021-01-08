import StepsModel from './steps-model.interface';

export type StepsState = {
    [K in keyof StepsModel['byId']]?: { [dateKey: string]: any };
};
