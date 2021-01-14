import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ReceivedOrder } from '@app/core/models/received-order';
import { ServicesApiCache } from '@app/core/services/cache';
import { HelperService } from '@app/core/services/helper.service';
import { ReceiverOrderStatusController } from '@app/my-orders/services';
import { Service } from '@app/service/models/service';

@Component({
  selector: 'app-received-order-list-item',
  templateUrl: './received-order-list-item.component.html',
  styleUrls: ['./received-order-list-item.component.scss'],
})
export class ReceivedOrderListItemComponent {

  public service: Service;
  @Output() public statusChanged = new EventEmitter<void>();

  private _order: ReceivedOrder;

  constructor(
    private readonly servicesCache: ServicesApiCache,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly orderStatusController: ReceiverOrderStatusController,
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

  public async onAcceptClick(): Promise<void> {
    await this.orderStatusController.acceptOrder(this.order);
    this.statusChanged.emit();
  }

  public async onDiscardClick(): Promise<void> {
    await this.orderStatusController.discardOrder(this.order);
    this.statusChanged.emit();
  }

  public getPhoto(photo: string): string | SafeResourceUrl {
    return photo || HelperService.getNoAvatarLink();
  }
}
