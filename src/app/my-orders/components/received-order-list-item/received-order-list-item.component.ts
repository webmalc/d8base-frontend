import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {SafeResourceUrl} from '@angular/platform-browser';
import {ReceivedOrder} from '@app/core/models/received-order';
import {ServicesApiCache} from '@app/core/services/cache';
import {HelperService} from '@app/core/services/helper.service';
import {Service} from '@app/service/models/service';

@Component({
    selector: 'app-received-order-list-item',
    templateUrl: './received-order-list-item.component.html',
    styleUrls: ['./received-order-list-item.component.scss']
})
export class ReceivedOrderListItemComponent {

    public service: Service;
    @Output() public accept = new EventEmitter<ReceivedOrder>();

    private _order: ReceivedOrder;

    constructor(
        private readonly servicesCache: ServicesApiCache,
        private readonly changeDetector: ChangeDetectorRef
    ) {
    }

    public get order(): ReceivedOrder {
        return this._order;
    }

    @Input()
    public set order(order: ReceivedOrder) {
        this._order = order;
        if (!order) {
            return;
        }
        this.servicesCache.getById(order.service).subscribe(service => {
            this.service = service;
            this.changeDetector.markForCheck();
        });
    }

    public onAcceptClick(): void {
        this.accept.emit(this.order);
    }

    public getPhoto(photo: string): string | SafeResourceUrl {
        return photo || HelperService.getNoAvatarLink();
    }
}