import { Component, Input } from '@angular/core';
import { ServiceList } from '@app/api/models';
import { ServiceTag } from '@app/service/models/service-tag';

@Component({
  selector: 'app-master-profile-service-presentation',
  templateUrl: './master-profile-service-presentation.component.html',
  styleUrls: ['./master-profile-service-presentation.component.scss'],
})
export class MasterProfileServicePresentationComponent {
  @Input() public serviceData: { service: ServiceList; tags?: ServiceTag[] };
}
