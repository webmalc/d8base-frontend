import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReceivedOrder, Service } from '@app/api/models';
import { ServicesApiCache } from '@app/core/services/cache';
import { ReceivedOrderManager } from '@app/my-orders/services';
import { OrderListItem } from '../abstract/order-list-item';

@Component({
  selector: 'app-received-order-list-item',
  templateUrl: './received-order-list-item.component.html',
  styleUrls: ['./received-order-list-item.component.scss'],
})
export class ReceivedOrderListItemComponent extends OrderListItem {
  public service: Service;
  @Output() public statusChanged = new EventEmitter<void>();

  private _order: ReceivedOrder;

  constructor(
    private readonly servicesCache: ServicesApiCache,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly orderStatusController: ReceivedOrderManager,
  ) {
    super();
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

    if (order?.source === 'manual') {
      this._order.client = {
        ...order.client,
        first_name: order.first_name,
        last_name: order.last_name,
        avatar_thumbnail: null,
        avatar: null,
      };
    }

    this.servicesCache.getByEntityId(order.service).subscribe(service => {
      this.service = service;
      this.changeDetector.markForCheck();
    });
  }

  public onAcceptClick(): Promise<void> {
    return this.perform(() => this.orderStatusController.acceptOrder(this.order));
  }

  public onDiscardClick(): Promise<void> {
    return this.perform(() => this.orderStatusController.discardOrder(this.order));
  }

  public onCompleteClick(): Promise<void> {
    return this.perform(() => this.orderStatusController.completeOrder(this.order));
  }
}
