import { Injectable } from '@angular/core';
import { SentOrder } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { OrderStatus } from '@app/core/types/order-status';

@Injectable()
export class SentOrderStatusController {
  constructor(private readonly api: AccountsService) {}

  public async discardOrder(order: SentOrder): Promise<void> {
    await this.setStatus(order, 'canceled');
  }

  private setStatus(order: SentOrder, status: OrderStatus): Promise<SentOrder> {
    const acceptedOrder: SentOrder = {
      ...order,
      status,
    };

    return this.api
      .accountsOrdersSentPartialUpdate({
        id: acceptedOrder.id,
        data: acceptedOrder,
      })
      .toPromise();
  }
}
