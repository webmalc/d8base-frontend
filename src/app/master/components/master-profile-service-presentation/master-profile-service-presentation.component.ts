import { Component, Input } from '@angular/core';
import { ServiceList, ServiceTag } from '@app/api/models';

@Component({
  selector: 'service-viewer',
  templateUrl: './master-profile-service-presentation.component.html',
  styleUrls: ['./master-profile-service-presentation.component.scss'],
})
export class MasterProfileServicePresentationComponent {
  @Input() public serviceData: { service: ServiceList; tags?: ServiceTag[] };
}
