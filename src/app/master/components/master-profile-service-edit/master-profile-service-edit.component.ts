import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Service} from '@app/service/models/service';

@Component({
    selector: 'app-master-profile-service-edit',
    templateUrl: './master-profile-service-edit.component.html',
    styleUrls: ['./master-profile-service-edit.component.scss'],
})
export class MasterProfileServiceEditComponent {

    @Input() public service: Service;
    @Output() public enableService: EventEmitter<Service> = new EventEmitter<Service>();
    @Output() public disableService: EventEmitter<Service> = new EventEmitter<Service>();

    public getPrice(): string {
        return this.service.price.is_price_fixed ?
            Math.round(this.service.price.price).toString() :
            `${Math.round(this.service.price.start_price)} - ${this.service.price.end_price}`;
    }

    public onIsEnabled(isEnabled: boolean): void {
        isEnabled ? this.enableService.emit(this.service) : this.disableService.emit(this.service);
    }
}