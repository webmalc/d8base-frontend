import { Component, Input } from '@angular/core';
import { ServiceList } from '@app/api/models';
import { getServiceOrderUrl } from '@app/core/functions/navigation.functions';

@Component({
  selector: 'app-service-viewer',
  templateUrl: './service-viewer.component.html',
  styleUrls: ['./service-viewer.component.scss'],
})
export class ServiceViewerComponent {
  @Input() public service: ServiceList;

  public getServiceOrderUrl(service: ServiceList): string {
    return getServiceOrderUrl(service.id);
  }
}
