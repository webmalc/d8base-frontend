import {PartialUserInterface} from '@app/core/interfaces/partial-user-interface';
import {Master} from '@app/core/models/master';

export default interface MasterProfileContext {
    user?: PartialUserInterface;
    master?: Master;
    canEdit?: boolean;
}
