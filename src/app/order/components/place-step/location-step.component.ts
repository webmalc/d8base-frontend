import {Component} from '@angular/core';
import {OrderService} from '@app/order/services/order.service';

@Component({
    selector: 'app-location-step',
    templateUrl: './location-step.component.html',
    styleUrls: ['./location-step.component.scss']
})
export class LocationStepComponent {
    constructor(private readonly orderService: OrderService) {
    }

    public update(event: CustomEvent): void {
        const location = event.detail.value;
        this.orderService.update({location});
    }
}
