import {Component} from '@angular/core';
import {StepComponent} from '@app/order/abstract/step';
import {OrderWizardStateService} from '@app/order/services/order-wizard-state.service';

@Component({
    selector: 'app-client-details-step',
    templateUrl: './client-details-step.component.html',
    styleUrls: ['./client-details-step.component.scss']
})
export class ClientDetailsStepComponent extends StepComponent {
    public isForMe: boolean;
    public valid: boolean = false;

    constructor(wizardState: OrderWizardStateService) {
        super(wizardState);
    }

    public toggleIsForMe(event: CustomEvent): void {
        this.isForMe = event.detail?.checked;
        if (this.isForMe) {
            this.valid = true;
        } else {
            this.setValid();
        }
    }

    protected update(): void {
        this.wizardState.update({
            is_another_person: !this.isForMe
        });
    }

    private setValid(): void {
        this.valid = false;
        // TODO: check for required fields
    }
}
