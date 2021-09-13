import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavBranch, NavPath } from '@app/core/constants/navigation.constants';
import { isFormInvalid } from '@app/core/functions/form.functions';
import { NgDestroyService, ServiceManagerService } from '@app/core/services';
import { ServiceBuilderService } from '@app/service/pages/service-wizard-page/services';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ServiceWizardStateService } from '../../services/service-wizard-state.service';
import { StepComponent } from '../step/step';

@Component({
  selector: 'app-service-step-container',
  templateUrl: './service-step-container.component.html',
  styleUrls: ['./service-step-container.component.scss'],
  providers: [NgDestroyService],
})
export class ServiceStepContainerComponent {
  @Input()
  public form: FormGroup;

  public isFirstStep$: Observable<boolean> = this.wizardState.isFirstStep();
  public isLastStep$: Observable<boolean> = this.wizardState.isLastStep();

  constructor(
    private readonly wizardState: ServiceWizardStateService,
    private readonly serviceBuilder: ServiceBuilderService,
    private readonly serviceManager: ServiceManagerService,
    private readonly router: Router,
    private readonly cd: ChangeDetectorRef,
    private readonly ngDestroy$: NgDestroyService,
    private readonly serviceStepComponent: StepComponent<any>,
  ) {
    this.subscribeToState();
  }

  public async nextStep(): Promise<void> {
    if (isFormInvalid(this.form)) {
      return;
    }
    await this.serviceBuilder.addData(this.serviceStepComponent.getState());
    this.wizardState.nextStep();
  }

  public async prevStep(): Promise<void> {
    await this.serviceBuilder.addData(this.serviceStepComponent.getState());
    this.wizardState.prevStep();
  }

  public async submit(): Promise<void> {
    await this.serviceBuilder.addData(this.serviceStepComponent.getState());
    this.serviceManager
      .createService(await this.serviceBuilder.build())
      .subscribe(() => this.router.navigate([NavPath.Professional, NavBranch.MyServices]));
  }

  private subscribeToState(): void {
    this.serviceBuilder.state$.pipe(takeUntil(this.ngDestroy$)).subscribe(currentState => {
      this.serviceStepComponent.setState(currentState);
      this.cd.markForCheck();
    });
  }
}
