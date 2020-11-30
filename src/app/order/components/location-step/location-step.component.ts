import {Component} from '@angular/core';
import {StepComponent} from '@app/order/abstract/step';
import {OrderWizardStateService} from '@app/order/services/order-wizard-state.service';
import {ClientLocationInterface} from '@app/shared/interfaces/client-location-interface';

export type LocationType = 'location-online' | 'location-professional' | 'location-client';

@Component({
    selector: 'app-location-step',
    templateUrl: './location-step.component.html',
    styleUrls: ['./location-step.component.scss']
})
export class LocationStepComponent extends StepComponent {
    public masterLocations: ClientLocationInterface[];
    public clientLocations: ClientLocationInterface[];
    public locationSelected: boolean;

    private clientLocation: ClientLocationInterface;
    private masterLocation: ClientLocationInterface;

    constructor(wizardState: OrderWizardStateService) {
        super(wizardState);
    }

    public updateLocationType(event: CustomEvent): void {
        const location: LocationType = event.detail.value;
        if (location === 'location-online') { // tslint:disable-line:prefer-switch
            this.clientLocations = null;
            this.masterLocations = null;
            this.locationSelected = true;
        } else if (location === 'location-professional') {
            this.masterLocations = this.wizardState.getMasterLocations();
            this.clientLocations = null;
            this.locationSelected = false;
        } else if (location === 'location-client') {
            this.clientLocations = this.wizardState.getClientLocations();
            this.masterLocations = null;
            this.locationSelected = false;
        }
    }

    public updateMasterLocation(event: CustomEvent): void {
        this.masterLocation = event.detail.value;
        this.clientLocation = null;
        this.locationSelected = true;
    }

    public updateClientLocation(event: CustomEvent): void {
        this.clientLocation = event.detail.value;
        this.masterLocation = null;
        this.locationSelected = true;
    }

    protected update(): void {
        this.wizardState.update({
            client_location: this.clientLocation?.id,
            service_location: this.masterLocation?.id
        });
    }
}
