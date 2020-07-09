import {Expose} from 'class-transformer';

export class ServicePhoto {
    @Expose() public id: number;
    @Expose() public service: number;
    @Expose() public name: string;
    @Expose() public description: string;
    @Expose() public order: string;
    @Expose() public photo: string;
    @Expose() public photo_thumbnail: string;
}
