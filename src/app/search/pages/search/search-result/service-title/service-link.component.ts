import { Component, Input } from '@angular/core';
import { Service } from '@app/api/models';

/**
 * Presentational component: service link (title) with price
 */
@Component({
  selector: 'app-service-link',
  templateUrl: './service-link.component.html',
  styleUrls: ['./service-link.component.scss'],
})
export class ServiceLinkComponent {
  @Input() public service: Service;
}
