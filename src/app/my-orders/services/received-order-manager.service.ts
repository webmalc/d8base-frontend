import { Injectable } from '@angular/core';
import { AccountsService } from '@app/api/services';
import { ReceivedOrder } from '@app/api/models';
import { OrderStatus } from '@app/core/types/order-status';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ReceivedOrderManager {
  constructor(
    private readonly api: AccountsService,
    private readonly alertController: AlertController,
    private readonly translate: TranslateService,
  ) {}

  public async acceptOrder(order: ReceivedOrder): Promise<void> {
    await this.setStatus(order, 'confirmed');
  }

  public async completeOrder(order: ReceivedOrder): Promise<void> {
    await this.setStatus(order, 'completed');
  }

  public async discardOrder(order: ReceivedOrder): Promise<void> {
    return new Promise(async resolve => {
      const alert = await this.alertController.create({
        message: this.translate.instant('received_orders.discard-confirmation'),
        buttons: [
          {
            text: this.translate.instant('global.yn.n'),
            role: 'cancel',
            handler: () => {
              resolve();
            },
          },
          {
            text: this.translate.instant('global.yn.y'),
            handler: async () => {
              await this.setStatus(order, 'canceled');
              resolve();
            },
          },
        ],
      });

      await alert.present();
    });
  }

  private setStatus(order: ReceivedOrder, status: OrderStatus): Promise<ReceivedOrder> {
    const acceptedOrder: ReceivedOrder = {
      ...order,
      status,
    };

    return this.api
      .accountsOrdersReceivedPartialUpdate({
        id: acceptedOrder.id,
        data: acceptedOrder,
      })
      .toPromise();
  }
}
