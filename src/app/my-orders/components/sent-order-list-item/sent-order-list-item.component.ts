import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfessionalList, SentOrder, Service } from '@app/api/models';
import { ToastService } from '@app/core/services';
import { ServicesApiCache } from '@app/core/services/cache';
import { ProfessionalsApiCache } from '@app/core/services/cache/professionals-api-cache.service';
import { SentOrderManager } from '@app/my-orders/services';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-sent-order-list-item',
  templateUrl: './sent-order-list-item.component.html',
  styleUrls: ['./sent-order-list-item.component.scss'],
})
export class SentOrderListItemComponent {
  public service: Service;
  public master: ProfessionalList;

  @Output()
  public statusChanged = new EventEmitter<void>();

  private _order: SentOrder;

  constructor(
    private readonly servicesCache: ServicesApiCache,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly masterCache: ProfessionalsApiCache,
    private readonly orderStatusController: SentOrderManager,
    private readonly toast: ToastService,
  ) {}

  public get order(): SentOrder {
    return this._order || ({} as SentOrder);
  }

  @Input()
  public set order(order: SentOrder) {
    this._order = order;
    if (!order) {
      return;
    }
    this.servicesCache
      .getByEntityId(order.service)
      .pipe(
        switchMap(service => {
          this.service = service;

          return this.masterCache.getByEntityId(service.professional);
        }),
      )
      .subscribe(master => {
        this.master = master;
        this.changeDetector.markForCheck();
      });
  }

  public get canCancel(): boolean {
    return this.order.status === 'not_confirmed' || this.order.status === 'confirmed';
  }

  public async onDiscardClick(): Promise<void> {
    const orderCanceled = await this.orderStatusController.discardOrder(this.order);
    if (orderCanceled) {
      this.toast.showMessage('sent-orders.order-discarded', { translate: true });
      this.statusChanged.emit();
    }
  }
}
