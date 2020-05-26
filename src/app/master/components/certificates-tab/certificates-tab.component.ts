import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit, SecurityContext} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {ListComponentTrait} from '@app/core/traits/list-component-trait';
import {CertificatesFormFields} from '@app/master/enums/certificates-form-fields';
import {CertificatesFormService} from '@app/master/forms/certificates-form.service';
import {Certificate} from '@app/master/models/certificate';
import {CertificatesApiService} from '@app/master/services/certificates-api.service';
import {forkJoin, throwError} from 'rxjs';

@Component({
    selector: 'app-certificates-tab',
    templateUrl: './certificates-tab.component.html',
    styleUrls: ['./certificates-tab.component.scss'],
})
export class CertificatesTabComponent extends ListComponentTrait implements OnInit {

    public formFields = CertificatesFormFields;
    private masterId: number;
    private certificatesList: Certificate[] = [];

    constructor(
        public formService: CertificatesFormService,
        private api: CertificatesApiService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) {
        super();
    }

    public ngOnInit(): void {
        this.masterId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
        this.api.get(this.masterId).subscribe(
            results => {
                this.createHashArray(results.results, this.certificatesList);
                this.formService.createForm(results.results);
            },
            (error: HttpErrorResponse) => {
                if (error.status === 404) {
                    return this.formService.createForm();
                }
                throwError(error);
            }
        );
    }

    public submitCertificatesForm(): void {
        let form = this.formService.form.getRawValue()[this.formFields.Certificates];
        form = this.cleanPhotos(form);
        const dataToDelete = this.getDataToDelete<Certificate>(form, this.certificatesList);
        forkJoin({
            created: this.api.create(this.getDataToCreate<Certificate>(form, this.masterId)),
            updated: this.api.update(this.getDataToUpdate<Certificate>(form, this.masterId, this.certificatesList)),
            deleted: this.api.delete(dataToDelete)
        }).subscribe(
            ({created, updated, deleted}) => {
                if (created) {
                    this.updateListAfterPost(created);
                }
                this.updateListAfterDelete(dataToDelete);
            }
        );
    }

    public getPhoto(index: number): string | SafeResourceUrl {
        const photoControl: string = this.formService.getPhotoByIndex(index).value;
        if (!photoControl) {
            return 'assets/images/profile/noavatar.jpeg';
        }

        return this.sanitizer.sanitize(
            SecurityContext.RESOURCE_URL,
            this.sanitizer.bypassSecurityTrustResourceUrl(photoControl)
        );
    }

    protected updateListAfterPost(elements: Certificate[]): void {
        elements.forEach(exp => this.certificatesList.push(exp));
    }

    protected updateListAfterDelete(elements: Certificate[]): void {
        elements.forEach(element => delete this.certificatesList[element.id]);
    }

    private cleanPhotos(certificates: Certificate[]): Certificate[] {
        const ret: Certificate[] = [];
        certificates.forEach((certificate, idx) => {
            if (!this.formService.getPhotoByIndex(idx).dirty) {
                delete certificate.photo;
            }
            ret.push(certificate);
        });

        return ret;
    }
}
