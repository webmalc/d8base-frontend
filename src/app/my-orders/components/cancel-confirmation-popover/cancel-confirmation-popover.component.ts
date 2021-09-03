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
  public noteControl = new FormControl('', Validators.required);

  constructor(private readonly popoverController: PopoverController) {}

  public confirm(): void {
    const cancelOrder: CancelOrder = {
      cancel_note: this.noteControl.value,
      cancel_reason: 'other',
    };
    this.popoverController.dismiss(cancelOrder);
  }
}
