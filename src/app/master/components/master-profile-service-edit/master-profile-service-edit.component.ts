import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServiceList } from '@app/api/models';

@Component({
  selector: 'service-editor',
  templateUrl: './master-profile-service-edit.component.html',
  styleUrls: ['./master-profile-service-edit.component.scss'],
})
export class MasterProfileServiceEditComponent {

  @Input() public service: ServiceList;
  @Output() public enableService: EventEmitter<ServiceList> = new EventEmitter<ServiceList>();
  @Output() public disableService: EventEmitter<ServiceList> = new EventEmitter<ServiceList>();
  @Output() public deleteService: EventEmitter<ServiceList> = new EventEmitter<ServiceList>();

  public onIsEnabled(isEnabled: boolean): void {
    isEnabled ? this.enableService.emit(this.service) : this.disableService.emit(this.service);
  }

  public delete(): void {
    this.deleteService.emit(this.service);
  }
}
