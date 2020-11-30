import {Component, EventEmitter, Output} from '@angular/core';
import {StepComponent} from '@app/order/abstract/step';
import {OrderWizardStateService} from '@app/order/services/order-wizard-state.service';

@Component({
    selector: 'app-summary-step',
    templateUrl: './summary-step.component.html',
    styleUrls: ['./summary-step.component.scss']
})

export class SummaryStepComponent extends StepComponent {
    @Output() public submit = new EventEmitter<void>();

    constructor(orderService: OrderWizardStateService) {
        super(orderService);
    }

    public onSubmit(): void {
        this.submit.emit();
    }
}
