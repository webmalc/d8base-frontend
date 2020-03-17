import {Expose} from 'class-transformer';

export class Master {
    @Expose() public id: number;
    @Expose() public user_id: number;
    @Expose() public description?: number;
    @Expose() public status?: number;
    @Expose() public tags?: number;
}
