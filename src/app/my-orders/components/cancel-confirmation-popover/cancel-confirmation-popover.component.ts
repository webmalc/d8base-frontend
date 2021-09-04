import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CancelOrder } from '@app/api/models';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-cancel-confirmation-popover',
  templateUrl: './cancel-confirmation-popover.component.html',
  styleUrls: ['./cancel-confirmation-popover.component.scss'],
})
export class CancelConfirmationPopoverComponent {
  public reasonControl = new FormControl('', Validators.required);
  public noteControl = new FormControl('');
  public reasons: { [K in CancelOrder['cancel_reason']]: CancelOrder['cancel_reason'] } = {
    dates: 'dates',
    other: 'other',
  };

  constructor(private readonly popoverController: PopoverController) {}

  public confirm(): void {
    const cancelOrder: CancelOrder = {
      cancel_note: this.noteControl.value,
      cancel_reason: this.reasonControl.value,
    };
    this.popoverController.dismiss(cancelOrder);
  }
}
