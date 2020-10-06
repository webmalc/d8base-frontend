import {MasterInterface} from '@app/core/interfaces/master.interface';
import {Expose} from 'class-transformer';

// tslint:disable:variable-name
export class Master implements MasterInterface {
    @Expose() public id: number;
    @Expose() public name: string;
    @Expose() public description: string;
    @Expose() public company: string;
    @Expose() public experience: number;
    @Expose() public level: string;
    @Expose() public rating: string;
    @Expose() public is_auto_order_confirmation: boolean;
    @Expose() public subcategory: number;

}
