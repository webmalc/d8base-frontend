import {Expose} from 'class-transformer';

export class Education {
    @Expose() public id: number;
    @Expose() public professional: number;
    @Expose() public university: string;
    @Expose() public deegree?: string;
    @Expose() public field_of_study?: string;
    @Expose() public is_still_here?: boolean;
    @Expose() public start_date: string;
    @Expose() public end_date: string;
    @Expose() public description?: string;
}
