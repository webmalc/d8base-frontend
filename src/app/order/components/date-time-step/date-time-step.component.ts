import {Component} from '@angular/core';
import {OrderService} from '@app/order/services/order.service';

@Component({
    selector: 'app-service-order-step-one',
    templateUrl: './date-time-step.component.html',
    styleUrls: ['./date-time-step.component.scss']
})
export class DateTimeStepComponent {
    constructor(private readonly orderService: OrderService) {
    }

    public updateDate(event: CustomEvent): void {
        const date = new Date(event.detail.value);
        this.orderService.update({date});
    }

    public updateTime(event: CustomEvent): void {
        const time = new Date(event.detail.value);
        this.orderService.update({time});
    }
}
