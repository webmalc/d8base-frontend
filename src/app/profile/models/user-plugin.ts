import {Expose} from 'class-transformer';

export class UserPlugin {
    @Expose() public id?: number = undefined;
    @Expose() public user_id: number;
    @Expose() public plugin_id: number;
}
