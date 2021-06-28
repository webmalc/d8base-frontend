import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '@app/api/models';
import { Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { ServiceIds } from '../../enums/service-ids.enum';
import { ServiceStepContext } from '../../interfaces/step-context.interface';
import { StepModel } from '../../interfaces/step-model.interface';
import { ServiceWizardStateService } from '../../services/service-wizard-state.service';
import { ServiceStepComponent } from '../step/step';

@Component({
  selector: 'app-service-step-container',
  templateUrl: './service-step-container.component.html',
  styleUrls: ['./service-step-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceStepContainerComponent implements OnInit, OnDestroy {
  public currentStep$: Observable<StepModel> = this.wizardState.getCurrentStep();
  public isNextDisabled$: Observable<boolean> = this.serviceStepComponent.isValid$.pipe(map(value => !value));
  public isPrevDisabled$: Observable<boolean> = this.wizardState.isFirstStep();
  public isLastStep$: Observable<boolean> = this.wizardState.isLastStep();
  public context$: Observable<ServiceStepContext> = this.wizardState.getContext();
  public serviceDetailsState$: Observable<Partial<Service>> = this.wizardState
    .getState()
    .pipe(map(ServiceStepsState => Object.values(ServiceStepsState).reduce((acc, curr) => ({ ...acc, ...curr }), {})));

  private readonly ngDestroy$ = new Subject<void>();

  constructor(
    private readonly wizardState: ServiceWizardStateService,
    private readonly route: ActivatedRoute,
    private readonly cd: ChangeDetectorRef,
    private readonly serviceStepComponent: ServiceStepComponent<unknown>,
  ) {}

  public ngOnInit(): void {
    this.subscribeAll();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  public nextStep(): void {
    this.wizardState.setCurrentStepState(this.serviceStepComponent.outputData);
    this.wizardState.nextStep();
  }

  public prevStep(): void {
    this.wizardState.setCurrentStepState(this.serviceStepComponent.outputData);
    this.wizardState.prevStep();
  }

  public submit(): void {
    this.wizardState.doSubmit();
  }

  private subscribeInputCurrentState(): void {
    this.wizardState
      .getCurrentStepState()
      .pipe(take(1), takeUntil(this.ngDestroy$))
      .subscribe(currentState => {
        this.serviceStepComponent.setState(currentState);
        this.cd.markForCheck();
      });
  }

  private subscribeInputContext(): void {
    this.wizardState
      .getContext()
      .pipe(take(1), takeUntil(this.ngDestroy$))
      .subscribe(context => {
        this.serviceStepComponent.setContext(context);
        this.cd.markForCheck();
      });
  }

  private subscribeAll(): void {
    this.subscribeInputContext();
    this.subscribeInputCurrentState();
    this.subscribeStepRoute();
    this.resubscribeOnReset();
  }

  private subscribeStepRoute(): void {
    this.route.params.pipe(takeUntil(this.ngDestroy$)).subscribe(() => {
      const step = this.route.routeConfig.path.split('/').pop();
      this.wizardState.setCurrentStep(step as ServiceIds);
      this.cd.markForCheck();
    });
  }

  private resubscribeOnReset(): void {
    this.wizardState
      .isReset()
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(() => {
        this.ngDestroy$.next();
        this.subscribeAll();
      });
  }
}
