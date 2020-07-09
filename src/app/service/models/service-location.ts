import {Expose} from 'class-transformer';

export class ServiceLocation {
    @Expose() public id: number;
    @Expose() public service: number;
    @Expose() public location: number;
    @Expose() public max_distance: number;
}
