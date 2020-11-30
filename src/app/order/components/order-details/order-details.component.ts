import {Component, Input} from '@angular/core';
import {OrderPostModel} from '@app/core/models/order-model';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
    @Input() public order: Partial<OrderPostModel>;
}
