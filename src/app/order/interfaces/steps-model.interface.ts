import StepModel from './step-model.interface';

export default interface StepsModel {
    byId: { [id: string]: StepModel };
    ids: string[];
}
