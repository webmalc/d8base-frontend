import {Component, Input} from '@angular/core';
import {ProfessionalCertificateInline} from '@app/api/models/professional-certificate-inline';

@Component({
    selector: 'app-certificate',
    templateUrl: './certificate.component.html',
    styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent {
    @Input() public certificate: ProfessionalCertificateInline;
    @Input() public editable: boolean = false;
}
