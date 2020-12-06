import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {OrderModel} from '@app/core/models/order-model';
import {ServicesApiCache} from '@app/inbox/services';
import {Service} from '@app/service/models/service';

@Component({
    selector: 'app-order-list-item',
    templateUrl: './order-list-item.component.html',
    styleUrls: ['./order-list-item.component.scss']
})
export class OrderListItemComponent {
    public service: Service;
    @Output() public accept = new EventEmitter<OrderModel>();

    private _order: OrderModel;

    constructor(private readonly servicesCache: ServicesApiCache, private readonly changeDetector: ChangeDetectorRef) {
    }

    public get order(): OrderModel {
        return this._order;
    }

    @Input()
    public set order(order: OrderModel) {
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
}
