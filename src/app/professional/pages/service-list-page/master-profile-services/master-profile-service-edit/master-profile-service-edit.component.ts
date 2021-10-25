import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Price, ServiceList, ServicePhoto} from '@app/api/models';
import {getServiceDuration, getServicePriceStr} from '@app/core/functions/price.functions';
import {TranslateService} from '@ngx-translate/core';
import {declination} from '@app/core/functions/string.functions';
import { getServiceOrderUrl } from '@app/core/functions/navigation.functions';

@Component({
  selector: 'app-service-editor',
  templateUrl: './master-profile-service-edit.component.html',
  styleUrls: ['./master-profile-service-edit.component.scss'],
})
export class MasterProfileServiceEditComponent {
  @Input() public service: ServiceList;
  @Input() public canEdit: boolean;
  @Input() public photos: ServicePhoto[];
  @Output() public enableService: EventEmitter<ServiceList> = new EventEmitter<ServiceList>();
  @Output() public disableService: EventEmitter<ServiceList> = new EventEmitter<ServiceList>();
  @Output() public deleteService: EventEmitter<ServiceList> = new EventEmitter<ServiceList>();

  constructor(private readonly translateService: TranslateService) {
  }

  public onIsEnabled(isEnabled: boolean): void {
    if (isEnabled) {
      this.enableService.emit(this.service);
    } else {
      this.disableService.emit(this.service);
    }
  }

  public getPrice(price: Price): string {
    return getServicePriceStr(price);
  }

  public getDuration(duration: number): string {
    const dur = getServiceDuration(duration);
    let days = '';
    let hours = '';
    let minutes = '';
    if (dur.days) {
      days = dur.days + " " +  this.translateService.instant(
        declination(dur.days, ['declination.days.1', 'declination.days.2', 'declination.days.3'])
      )
    }
    if (dur.hours) {
      hours = dur.hours + " " + this.translateService.instant(
        declination(dur.hours, ['declination.hours.1', 'declination.hours.2', 'declination.hours.3'])
      )
    }
    if (dur.minutes) {
      minutes = dur.minutes + " " + this.translateService.instant(
        declination(dur.minutes, ['declination.minutes.1', 'declination.minutes.2', 'declination.minutes.3'])
      )
    }

    return days + " " + hours + " " + minutes;
  }

  public getServiceOrderUrl(service: ServiceList): string {
    return getServiceOrderUrl(service.id);
  }

  public delete(): void {
    this.deleteService.emit(this.service);
  }
}
