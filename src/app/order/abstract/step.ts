import {OrderWizardStateService} from '@app/order/services/order-wizard-state.service';

export abstract class StepComponent {
    protected constructor(protected readonly wizardState: OrderWizardStateService) {
    }

    public nextStep(): void {
        this.update();
        this.wizardState.navigateToStep(1);
    }

    public prevStep(): void {
        this.wizardState.navigateToStep(-1);
    }

    protected update(): void {
        // should be overridden
    }
}
