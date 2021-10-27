import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isFormInvalid } from '@app/core/functions/form.functions';
import { getProfessionalServicesUrl } from '@app/core/functions/navigation.functions';
import { NgDestroyService } from '@app/core/services';
import { StepComponent } from '@app/booking/abstract/step';
import { OrderIds } from '@app/booking/enums/order-ids.enum';
import StepContext from '@app/booking/interfaces/step-context.interface';
import StepModel from '@app/booking/interfaces/step-model.interface';
import { OrderWizardStateService } from '@app/booking/services';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  constructor(
    private readonly wizardState: OrderWizardStateService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cd: ChangeDetectorRef,
    private readonly stepComponent: StepComponent<unknown>,
    private readonly ngDestroy$: NgDestroyService,
  ) {}

  public ngOnInit(): void {
    this.subscribeOnContext();
    this.subscribeOnState();
    this.subscribeOnRoute();
  }

  public nextStep(): void {
    if (this.stepComponent.form ? isFormInvalid(this.stepComponent.form) : false) {
      return;
    }

    this.wizardState.nextStep(this.stepComponent.outputData);
  }

  public prevStep(): void {
    this.wizardState.prevStep(this.stepComponent.outputData);
  }

  public submit(): void {
    if (this.stepComponent.form ? isFormInvalid(this.stepComponent.form) : false) {
      return;
    }

    this.wizardState.doSubmit(this.stepComponent.outputData);
  }

  public async reset(): Promise<void> {
    const { professionalId } = this.wizardState.resetWizard();
    await this.router.navigateByUrl(getProfessionalServicesUrl(professionalId));
  }

  private subscribeOnState(): void {
    this.wizardState
      .getState()
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(state => {
        this.stepComponent.setState(state);
        this.cd.markForCheck();
      });
  }

  private subscribeOnContext(): void {
    this.wizardState
      .getContext()
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(context => {
        this.stepComponent.setContext(context);
        this.cd.markForCheck();
      });
  }

  private subscribeOnRoute(): void {
    this.route.params.pipe(takeUntil(this.ngDestroy$)).subscribe(() => {
      const step = this.route.routeConfig?.path.split('/').pop();
      this.wizardState.setCurrentStep(step as OrderIds);
      this.cd.markForCheck();
    });
  }
}
