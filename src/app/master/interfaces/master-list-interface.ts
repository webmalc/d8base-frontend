import {MasterInterface} from '@app/core/interfaces/master.interface';
import {PartialUserInterface} from '@app/core/interfaces/partial-user-interface';

export interface MasterListInterface extends MasterInterface {
    user: PartialUserInterface;
}
