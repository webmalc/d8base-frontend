import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceivedOrder } from '@app/api/models';
import { AccountsService } from '@app/api/services/accounts.service';
import { ServicesApiCache } from '@app/core/services/cache';
import { ReceiverOrderStatusController } from '@app/my-orders/services';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-received-order-page',
  templateUrl: './received-order-page.component.html',
  styleUrls: ['./received-order-page.component.scss'],
  providers: [ServicesApiCache],
})
export class ReceivedOrderPageComponent {

  public order$: Observable<ReceivedOrder>;

  constructor(
    private readonly  orderStatusController: ReceiverOrderStatusController,
    route: ActivatedRoute,
    api: AccountsService,
  ) {
    this.order$ = route.params.pipe(
      map(params => Number.parseInt(params.id, 10)),
      switchMap(id => id ? api.accountsOrdersReceivedRead(id) : of<ReceivedOrder>()),
    );
  }

  public async onAcceptClick(order: ReceivedOrder): Promise<void> {
    await this.orderStatusController.acceptOrder(order);
  }

  public async onDiscardClick(order: ReceivedOrder): Promise<void> {
    await this.orderStatusController.discardOrder(order);
  }
}
