import {Component, Input} from '@angular/core';
import {PhotoSanitizerService} from '@app/core/services/photo-sanitizer.service';
import {Certificate} from '@app/master/models/certificate';

@Component({
    selector: 'app-certificate',
    templateUrl: './certificate.component.html',
    styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent {
    @Input() public certificate: Certificate;
    @Input() public editable: boolean = false;

    constructor(public readonly sanitizer: PhotoSanitizerService) {
    }
}
