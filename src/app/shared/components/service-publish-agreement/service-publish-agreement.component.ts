import {Component} from '@angular/core';
import {TranslationService} from '@app/core/services/translation.service';

@Component({
    selector: 'app-service-publish-agreement',
    templateUrl: './service-publish-agreement.component.html',
    styleUrls: ['./service-publish-agreement.component.scss']
})
export class ServicePublishAgreementComponent {

    constructor(public trans: TranslationService) { }
}
