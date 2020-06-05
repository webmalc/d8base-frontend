import {Expose} from 'class-transformer';

export class Review {
    @Expose() public id: number;
    @Expose() public professional: number;
    @Expose() public title: string;
    @Expose() public description: string;
    @Expose() public rating: number;
}
