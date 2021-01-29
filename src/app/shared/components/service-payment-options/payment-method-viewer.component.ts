import { Component, Input } from '@angular/core';
import { Price } from '@app/api/models';

@Component({
  selector: 'app-payment-method-viewer',
  templateUrl: './payment-method-viewer.component.html',
  styleUrls: ['./payment-method-viewer.component.scss'],
})
export class PaymentMethodViewerComponent {
  @Input() public price: Price;

  public hasPaymentMethod(method: 'cash' | 'online'): boolean {
    return this.price?.payment_methods.includes(method);
  }
}
