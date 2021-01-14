import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceivedOrder } from '@app/core/models/received-order';
import { ServicesApiCache } from '@app/core/services/cache';
import { ReceivedOrdersApiService, ReceiverOrderStatusController } from '@app/my-orders/services';
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
    receivedOrdersApi: ReceivedOrdersApiService,
  ) {
    this.order$ = route.params.pipe(
      map(params => Number.parseInt(params.id, 10)),
      switchMap(id => id ? receivedOrdersApi.getByEntityId(id) : of<ReceivedOrder>()),
    );
  }

  public async onAcceptClick(order: ReceivedOrder): Promise<void> {
    await this.orderStatusController.acceptOrder(order);
  }

  public async onDiscardClick(order: ReceivedOrder): Promise<void> {
    await this.orderStatusController.discardOrder(order);
  }
}
