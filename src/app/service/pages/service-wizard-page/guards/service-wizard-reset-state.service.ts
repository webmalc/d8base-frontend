import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ServiceWizardPage } from '../service-wizard-page.component';
import { ServiceBuilderService, ServiceWizardStateService } from '../services';

@Injectable()
export class ServiceWizardResetStateService implements CanDeactivate<ServiceWizardPage> {
  constructor(
    private readonly wizardState: ServiceWizardStateService,
    private readonly serviceBuilder: ServiceBuilderService,
  ) {}

  public canDeactivate(): boolean {
    this.wizardState.reset();
    this.serviceBuilder.clear();
    return true;
  }
}
