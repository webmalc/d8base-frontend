import { Component, Input } from '@angular/core';
import { Service } from '@app/api/models';

@Component({
  selector: 'app-service-title',
  templateUrl: './service-title.component.html',
  styleUrls: ['./service-title.component.scss'],
})
export class ServiceTitleComponent {
  @Input() public service: Partial<Service> = {};
}
