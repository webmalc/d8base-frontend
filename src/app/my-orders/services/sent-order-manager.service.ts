import { Injectable } from '@angular/core';
import { CancelOrder, SentOrder } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { PopoverController } from '@ionic/angular';
import { CancelConfirmationPopoverComponent } from '../components/cancel-confirmation-popover/cancel-confirmation-popover.component';

@Injectable()
export class SentOrderManager {
  constructor(private readonly api: AccountsService, private readonly popoverController: PopoverController) {}

  public async discardOrder(order: SentOrder): Promise<void> {
    const pop = await this.popoverController.create({
      component: CancelConfirmationPopoverComponent,
      translucent: true,
      animated: true,
    });
    await pop.present();
    const eventDetail = await pop.onDidDismiss();
    const cancelOrder: CancelOrder = eventDetail.data;
    if (cancelOrder) {
      await this.api
        .accountsOrdersSentCancel({
          id: order.id,
          data: cancelOrder,
        })
        .toPromise();
    }
    await this.popoverController.dismiss();
  }
}
