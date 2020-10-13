import {AbstractPhotoModel} from '@app/core/models/abstract-photo-model';
import {Expose} from 'class-transformer';

export class ServicePhoto extends AbstractPhotoModel {
    @Expose() public id: number;
    @Expose() public service: number;
    @Expose() public name: string;
    @Expose() public description: string;
    @Expose() public order: string;
}
