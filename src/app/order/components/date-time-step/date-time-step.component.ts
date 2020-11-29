import {Component} from '@angular/core';
import {StepComponent} from '@app/order/abstract/step';
import {OrderWizardStateService} from '@app/order/services/order-wizard-state.service';

@Component({
    selector: 'app-date-time-step',
    templateUrl: './date-time-step.component.html',
    styleUrls: ['./date-time-step.component.scss']
})
export class DateTimeStepComponent extends StepComponent {
    public date: Date;
    public time: Date;

    constructor(wizardState: OrderWizardStateService) {
        super(wizardState);
    }

    public updateDate(event: CustomEvent): void {
        this.date = new Date(event.detail.value);
    }

    public updateTime(event: CustomEvent): void {
        this.time = new Date(event.detail.value);
    }

    protected update(): void {
        const date = this.date?.toDateString() || '';
        const time = this.time?.toTimeString() || '';
        this.wizardState.update({start_datetime: new Date(`${date} ${time}`).toISOString()});
    }
}
