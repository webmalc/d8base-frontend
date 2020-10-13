import {SafeResourceUrl} from '@angular/platform-browser';
import {AbstractPhotoSanitizer} from '@app/core/models/abstract-photo-sanitizer';
import {Expose} from 'class-transformer';

// tslint:disable:variable-name
export abstract class AbstractPhotoModel extends AbstractPhotoSanitizer {

    @Expose() public photo: string;
    @Expose() public photo_thumbnail: string;

    public getPhoto(): string | SafeResourceUrl {
        return super.getPhoto(this.photo);
    }

    public getPhotoThumbnail(): string | SafeResourceUrl {
        return super.getPhotoThumbnail(this.photo);
    }
}
