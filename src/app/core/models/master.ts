import {Expose} from 'class-transformer';

export class Master {
    @Expose() public id: number;
    @Expose() public name: string;
    @Expose() public description: string;
    @Expose() public company: string;
    @Expose() public experience: number;
    @Expose() public level: string;
    @Expose() public is_auto_order_confirmation: boolean;
    @Expose() public subcategory: number;
}
