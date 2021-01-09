import { Expose } from 'class-transformer';

export class ServiceTag {
    @Expose() public id: number;
    @Expose() public service: number;
    @Expose() public name: string;
}
