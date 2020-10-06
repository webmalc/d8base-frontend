import {PartialUserInterface} from '@app/core/interfaces/partial-user-interface';
import {Master} from '@app/core/models/master';
import {MasterListInterface} from '@app/master/interfaces/master-list-interface';
import {Expose} from 'class-transformer';

export class MasterList extends Master implements MasterListInterface {
    @Expose() public user: PartialUserInterface;
}
