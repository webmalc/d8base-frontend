import {MasterInterface} from '@app/core/interfaces/master.interface';
import {Expose} from 'class-transformer';

// tslint:disable:variable-name
export class Master implements MasterInterface {
    @Expose() public id: number;
    @Expose() public name: string;
    @Expose() public description: string;
    @Expose() public company: string;
    @Expose() public experience: number;
    @Expose() public level: 'junior' | 'middle' | 'senior';
    @Expose() public rating: string;
    @Expose() public subcategory: number;
}
