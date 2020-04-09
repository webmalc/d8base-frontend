import {Expose} from 'class-transformer';

export class Contact {
    @Expose() public id: number;
    @Expose() public name: string;
    @Expose() public countries: string[];
    @Expose() public excluded_countries: string[];
}
