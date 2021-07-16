import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ServiceWizardPage } from '../service-wizard-page.component';
import { ServiceWizardStateService } from '../services';

@Injectable()
export class ServiceWizardResetStateService implements CanDeactivate<ServiceWizardPage> {
  constructor(private readonly wizardState: ServiceWizardStateService) {}

  public canDeactivate(): boolean {
    this.wizardState.reset();
    return true;
  }
}
