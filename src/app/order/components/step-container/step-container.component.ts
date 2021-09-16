import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentOrder, ServiceList } from '@app/api/models';
import { isFormInvalid } from '@app/core/functions/form.functions';
import { getProfessionalScheduleUrl } from '@app/core/functions/navigation.functions';
import { NgDestroyService } from '@app/core/services';
import { StepComponent } from '@app/order/abstract/step';
import { OrderIds } from '@app/order/enums/order-ids.enum';
import StepContext from '@app/order/interfaces/step-context.interface';
import StepModel from '@app/order/interfaces/step-model.interface';
import { OrderWizardStateService } from '@app/order/services';
import { Observable } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-step-container',
  templateUrl: './step-container.component.html',
  styleUrls: ['./step-container.component.scss'],
  providers: [NgDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepContainerComponent implements OnInit {
  public currentStep$: Observable<StepModel> = this.wizardState.getCurrentStep();
  public isFirstStep$: Observable<boolean> = this.wizardState.isFirstStep();
  public isLastStep$: Observable<boolean> = this.wizardState.isLastStep();
  public context$: Observable<StepContext> = this.wizardState.getContext();
  public orderDetailsState$: Observable<Partial<SentOrder>> = this.wizardState
    .getState()
    .pipe(map(stepsState => Object.values(stepsState).reduce((acc, curr) => ({ ...acc, ...curr }), {})));

  constructor(
    private readonly wizardState: OrderWizardStateService,
    private readonly route: ActivatedRoute,
    private readonly cd: ChangeDetectorRef,
    private readonly stepComponent: StepComponent<unknown>,
    private readonly ngDestroy$: NgDestroyService,
  ) {}

  public ngOnInit(): void {
    this.subscribeAll();
  }

  public nextStep(): void {
    if (this.stepComponent.form ? isFormInvalid(this.stepComponent.form) : false) {
      return;
    }

    this.wizardState.setCurrentStepState(this.stepComponent.outputData);
    this.wizardState.nextStep();
  }

  public prevStep(): void {
    this.wizardState.setCurrentStepState(this.stepComponent.outputData);
    this.wizardState.prevStep();
  }

  public submit(): void {
    this.wizardState.doSubmit();
  }

  public getProfessionalScheduleUrl(service: ServiceList): string {
    return getProfessionalScheduleUrl(service.professional);
  }

  private subscribeInputCurrentState(): void {
    this.wizardState
      .getCurrentStepState()
      .pipe(take(1), takeUntil(this.ngDestroy$))
      .subscribe(currentState => {
        this.stepComponent.setState(currentState);
        this.cd.markForCheck();
      });
  }

  private subscribeInputContext(): void {
    this.wizardState
      .getContext()
      .pipe(take(1), takeUntil(this.ngDestroy$))
      .subscribe(context => {
        this.stepComponent.setContext(context);
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
      this.wizardState.setCurrentStep(step as OrderIds);
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
