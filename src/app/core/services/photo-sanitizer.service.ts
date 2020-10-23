import {Injectable, SecurityContext} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {HelperService} from '@app/core/services/helper.service';

@Injectable({
    providedIn: 'root'
})
export class PhotoSanitizerService {

    constructor(private readonly sanitizer: DomSanitizer) {
    }

    public sanitize(photo: string): string | SafeResourceUrl {
        if (!photo) {
            return HelperService.getNoAvatarLink();
        }

        return this.sanitizer.sanitize(
            SecurityContext.RESOURCE_URL,
            this.sanitizer.bypassSecurityTrustResourceUrl(photo)
        );
    }
}
