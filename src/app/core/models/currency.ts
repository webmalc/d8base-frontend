import {Expose} from 'class-transformer';

export class Currency {
    @Expose() public currency: string;
    @Expose() public title: string;
    @Expose() public sign: string;
    @Expose() public countries: string[];
    @Expose() public value: string;
}
