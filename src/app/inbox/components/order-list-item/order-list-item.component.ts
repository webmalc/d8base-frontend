import {Component, Input} from '@angular/core';
import {OrderModel} from '@app/core/models/order-model';

@Component({
    selector: 'app-order-list-item',
    templateUrl: './order-list-item.component.html',
    styleUrls: ['./order-list-item.component.scss'],
})
export class OrderListItemComponent {
    @Input() public order: OrderModel;
}
