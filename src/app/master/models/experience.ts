import {Expose} from 'class-transformer';

export class Experience {
    @Expose() public id: number;
    @Expose() public professional: number;
    @Expose() public title: string;
    @Expose() public company: string;
    @Expose() public is_still_here: boolean;
    @Expose() public start_date: string;
    @Expose() public end_date: string;
    @Expose() public description: string;
}
