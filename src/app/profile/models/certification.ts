import {Expose} from 'class-transformer';

export class Certification {
    @Expose() public id?: number;
    @Expose() public master_id: number;
    @Expose() public title: string;
    @Expose() public photo?: string;
    @Expose() public link?: string;
}
