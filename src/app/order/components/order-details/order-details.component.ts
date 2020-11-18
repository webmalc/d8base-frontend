import {Component, Input} from '@angular/core';
import {OrderDetails} from '@app/order/interfaces/order-details.interface';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
    @Input() public order: OrderDetails;
}
