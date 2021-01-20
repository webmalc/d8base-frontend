import { Component, Input } from '@angular/core';
import { Price } from '@app/api/models';

@Component({
  selector: 'app-service-payment-options',
  templateUrl: './service-payment-options.component.html',
  styleUrls: ['./service-payment-options.component.scss'],
})
export class ServicePaymentOptionsComponent {
  @Input() public price: Price;

  public hasPaymentMethod(method: 'cash' | 'online'): boolean {
    return this.price?.payment_methods.includes(method);
  }
}
