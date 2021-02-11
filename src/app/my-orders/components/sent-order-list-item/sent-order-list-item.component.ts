import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfessionalList, SentOrder, Service } from '@app/api/models';
import { ServicesApiCache } from '@app/core/services/cache';
import { MasterReadonlyApiCacheService } from '@app/core/services/cache/master-readonly-api-cache.service';
import { SentOrderStatusController } from '@app/my-orders/services';
import { switchMap } from 'rxjs/operators';
import { OrderListItem } from '../abstract/order-list-item';

@Component({
  selector: 'app-sent-order-list-item',
  templateUrl: './sent-order-list-item.component.html',
  styleUrls: ['./sent-order-list-item.component.scss'],
})
export class SentOrderListItemComponent extends OrderListItem {

  public service: Service;
  public master: ProfessionalList;
  @Output() public statusChanged = new EventEmitter<void>();

  private _order: SentOrder;

  constructor(
    private readonly servicesCache: ServicesApiCache,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly masterCache: MasterReadonlyApiCacheService,
    private readonly orderStatusController: SentOrderStatusController,
  ) {
    super();
  }

  public get order(): SentOrder {
    return this._order || {} as SentOrder;
  }

  @Input()
  public set order(order: SentOrder) {
    this._order = order;
    if (!order) {
      return;
    }
    this.servicesCache.getById(order.service).pipe(
      switchMap(service => {
        this.service = service;

        return this.masterCache.getById(service.professional);
      }),
    ).subscribe(master => {
      this.master = master;
      this.changeDetector.markForCheck();
    });
  }

  public onDiscardClick(): Promise<void> {
    return this.perform(() => this.orderStatusController.discardOrder(this.order));
  }
}
