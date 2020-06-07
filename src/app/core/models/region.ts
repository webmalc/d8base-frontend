import {Expose} from 'class-transformer';

export class Region {
    @Expose() public id: number;
    @Expose() public slug: string;
    @Expose() public name: string;
    @Expose() public alt_names: [number];
    @Expose() public code: string;
    @Expose() public country: number;
}
