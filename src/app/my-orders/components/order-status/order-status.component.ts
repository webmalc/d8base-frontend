import { Component, Input } from '@angular/core';
import { OrderStatus } from '@app/core/types/order-status';

@Component({
    selector: 'app-order-status',
    templateUrl: './order-status.component.html',
    styleUrls: ['./order-status.component.scss'],
})
export class OrderStatusComponent {
    @Input() public status: OrderStatus;
}
