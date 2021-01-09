import { Location } from '@angular/common';
import { Component, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HelperService } from '@app/core/services/helper.service';
import { Certificate } from '@app/master/models/certificate';
import { AbstractEditComponent } from '@app/shared/abstract/abstract-edit-component';
import { plainToClass } from 'class-transformer';

@Component({
    selector: 'app-certificate-edit',
    templateUrl: './certificate-edit.component.html',
    styleUrls: ['./certificate-edit.component.scss'],
})
export class CertificateEditComponent extends AbstractEditComponent<Certificate> {

    constructor(private readonly location: Location, private readonly sanitizer: DomSanitizer) {
        super();
    }

    public locationBack(): void {
        this.location.back();
    }

    public getPhoto(): string | SafeResourceUrl {
        const photo: string = this.item.photo;
        if (!photo) {
            return HelperService.getNoAvatarLink();
        }

        return this.sanitizer.sanitize(
            SecurityContext.RESOURCE_URL,
            this.sanitizer.bypassSecurityTrustResourceUrl(photo),
        );
    }

    protected transform(data: Certificate): Certificate {
        const trans: Certificate = plainToClass(Certificate, data);
        trans.formatDate();
        if (trans.photo && (trans.photo.slice(0, 7) === 'http://' || trans.photo.slice(0, 8) === 'https://')) {
            delete trans.photo;
        }

        return trans;
    }
}
