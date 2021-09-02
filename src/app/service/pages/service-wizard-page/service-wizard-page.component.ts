import { Component } from '@angular/core';
import { IonViewDidLeave, IonViewWillEnter } from '@app/core/interfaces/ionic.interfaces';
import { ServiceBuilderService, ServiceWizardStateService } from './services';

@Component({
  selector: 'app-service-wizard-page',
  templateUrl: './service-wizard-page.component.html',
})
export class ServiceWizardPage implements IonViewWillEnter, IonViewDidLeave {
  constructor(
    private readonly wizardState: ServiceWizardStateService,
    private readonly serviceBuilder: ServiceBuilderService,
  ) {}

  public ionViewWillEnter(): void {
    this.serviceBuilder.init();
  }

  public ionViewDidLeave(): void {
    this.wizardState.reset();
    this.serviceBuilder.clear();
  }
}
