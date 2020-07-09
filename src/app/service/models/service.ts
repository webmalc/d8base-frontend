import {Price} from '@app/service/models/price';
import {Expose} from 'class-transformer';

export class Service {
    @Expose() public id: number;
    @Expose() public professional: number;
    @Expose() public name: string;
    @Expose() public description: string;
    @Expose() public duration: number;
    @Expose() public service_type: string;
    @Expose() public is_base_schedule: boolean;
    @Expose() public is_enabled: boolean;
    @Expose() public price: Price;
}
