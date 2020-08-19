import {User} from '@app/core/models/user';

export interface StepFourDataInterface {
    isNewMaster: boolean;
    user?: User;
}
