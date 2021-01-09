import { ProfessionalList } from '@app/api/models';
import { Expose } from 'class-transformer';

// tslint:disable:variable-name
export class Master implements ProfessionalList {
    @Expose() public id: number;
    @Expose() public name: string;
    @Expose() public description: string;
    @Expose() public company: string;
    @Expose() public experience: number;
    @Expose() public level: 'junior' | 'middle' | 'senior';
    @Expose() public rating: string;
    @Expose() public subcategory: number;
}
