import {SecurityContext} from '@angular/core';
import {DomSanitizer, SafeResourceUrl, ɵDomSanitizerImpl} from '@angular/platform-browser';
import {HelperService} from '@app/core/services/helper.service';

export abstract class AbstractPhotoSanitizer {

    private readonly sanitizer: DomSanitizer;

    constructor() {
        this.sanitizer = new ɵDomSanitizerImpl(document);
    }

    public getPhoto(photo: string): string | SafeResourceUrl {
        return this.get(photo);
    }

    public getPhotoThumbnail(photoThumbnail: string): string | SafeResourceUrl {
        return this.get(photoThumbnail);
    }

    private get(photo: string): string | SafeResourceUrl {
        if (!photo) {
            return HelperService.getNoAvatarLink();
        }

        return this.sanitizer.sanitize(
            SecurityContext.RESOURCE_URL,
            this.sanitizer.bypassSecurityTrustResourceUrl(photo)
        );
    }
}
