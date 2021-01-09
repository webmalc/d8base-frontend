import { Expose } from 'class-transformer';

// tslint:disable:variable-name
export class MasterPhoto {
    @Expose() public id: number;
    @Expose() public professional: number;
    @Expose() public name: string;
    @Expose() public description: string;
    @Expose() public order: number;
    @Expose() public created: string;
    @Expose() public photo: string;
    @Expose() public photo_thumbnail: string;
}
