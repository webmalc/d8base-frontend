import {Component, SecurityContext} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Certificate} from '@app/master/models/certificate';
import {AbstractListItemComponent} from '@app/shared/components/abstract-list-item/abstract-list-item.component';

@Component({
    selector: 'app-certificates-item',
    templateUrl: './certificates-item.component.html',
    styleUrls: ['./certificates-item.component.scss'],
})
export class CertificatesItemComponent extends AbstractListItemComponent<Certificate> {

    constructor(private sanitizer: DomSanitizer) {
        super();
    }

    public getPhoto(): string | SafeResourceUrl {
        const photo: string = this.item.photo;
        if (!photo) {
            return 'assets/images/profile/noavatar.jpeg';
        }

        return this.sanitizer.sanitize(
            SecurityContext.RESOURCE_URL,
            this.sanitizer.bypassSecurityTrustResourceUrl(photo)
        );
    }
}
