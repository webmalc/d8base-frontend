import { Component, Input } from '@angular/core';
import { ServiceList } from '@app/api/models';

@Component({
  selector: 'app-service-location',
  templateUrl: './service-location.component.html',
  styleUrls: ['./service-location.component.scss'],
})
export class ServiceLocationComponent {
  @Input() public service: ServiceList;
}
