import {Component, Input} from '@angular/core';
import {Service} from '@app/service/models/service';
import {ServiceTag} from '@app/service/models/service-tag';

@Component({
    selector: 'app-master-profile-service-presentation',
    templateUrl: './master-profile-service-presentation.component.html',
    styleUrls: ['./master-profile-service-presentation.component.scss']
})
export class MasterProfileServicePresentationComponent {
    @Input() public serviceData: { service: Service, tags?: ServiceTag[] };
}
