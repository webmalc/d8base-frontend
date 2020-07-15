import {Expose} from 'class-transformer';

export class Subcategory {
    @Expose() public id: number;
    @Expose() public category: number;
    @Expose() public name: string;
    @Expose() public description: string;
    @Expose() public order: number;
}
