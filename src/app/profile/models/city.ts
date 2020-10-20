import {Expose} from 'class-transformer';

export class City {
    // tslint:disable:variable-name
    @Expose() public id: number;
    @Expose() public slug: string;
    @Expose() public name: string;
    @Expose() public name_std: string;
    @Expose() public alt_names: number[];
    @Expose() public country: number;
    @Expose() public region: number;
    @Expose() public subregion: number;
    @Expose() public location: {
        type: string;
        coordinates: number[]
    };
    @Expose() public population: number;
    @Expose() public elevation: string;
    @Expose() public kind: string;
    @Expose() public timezone: string;
}
