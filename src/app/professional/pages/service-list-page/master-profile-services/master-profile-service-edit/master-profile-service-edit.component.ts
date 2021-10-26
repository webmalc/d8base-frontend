import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServiceList, ServicePhoto } from '@app/api/models';
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

  public onIsEnabled(isEnabled: boolean): void {
    if (isEnabled) {
      this.enableService.emit(this.service);
    } else {
      this.disableService.emit(this.service);
    }
  }

  public getServiceOrderUrl(service: ServiceList): string {
    return getServiceOrderUrl(service.id);
  }

  public delete(): void {
    this.deleteService.emit(this.service);
  }
}
