import { Component, Input } from '@angular/core';
import { Service } from '@app/api/models';
import { NavQueryParams } from '@app/core/constants/navigation.constants';
import { getServiceUrl } from '@app/core/functions/navigation.functions';

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

  public queryParams = { [NavQueryParams.goBack]: true };

  public get serviceUrl(): string {
    return getServiceUrl(this.service.id);
  }
}
