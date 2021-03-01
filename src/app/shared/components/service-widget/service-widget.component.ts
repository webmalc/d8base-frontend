import { Component, Input } from '@angular/core';
import { ProfessionalList, ServiceList } from '@app/api/models';

@Component({
  selector: 'app-service-widget',
  templateUrl: './service-widget.component.html',
  styleUrls: ['./service-widget.component.scss'],
})
export class ServiceWidgetComponent {
  @Input() public service: ServiceList;

  @Input() public master: ProfessionalList;

  @Input() public alwaysExpanded = false;
}
