import {AbstractPhotoModel} from '@app/core/models/abstract-photo-model';
import {Expose} from 'class-transformer';

// tslint:disable:variable-name
export class MasterPhoto extends AbstractPhotoModel {
    @Expose() public id: number;
    @Expose() public professional: number;
    @Expose() public name: string;
    @Expose() public description: string;
    @Expose() public order: number;
    @Expose() public created: string;
}
