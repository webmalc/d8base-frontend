import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderIds, StepContext, StepModel } from '@app/order/order-steps';
import { Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { SentOrder } from '../../../core/models/sent-order';
import { StepComponent } from '../../abstract/step';
import { OrderWizardStateService } from '../../services/order-wizard-state.service';

@Component({
    selector: 'app-step-container',
    templateUrl: './step-container.component.html',
    styleUrls: ['./step-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepContainerComponent implements OnInit, OnDestroy {
    public get currentStep$(): Observable<StepModel> {
        return this.wizardState.getCurrentStep();
    }

    public get isNextDisabled$(): Observable<boolean> {
        return this.wizardState.isAbleToNext().pipe(map(value => !value));
    }

    public get isPrevDisabled$(): Observable<boolean> {
        return this.wizardState.isAbleToPrev().pipe(map(value => !value));
    }

    public get isLastStep$(): Observable<boolean> {
        return this.wizardState.isLastStep();
    }

    public get context$(): Observable<StepContext> {
        return this.wizardState.getContext();
    }

    public get orderDetailsState$(): Observable<SentOrder> {
        return this.wizardState.getState().pipe(
            map(stepsState => {
                return Object.values(stepsState).reduce((acc, curr) => {
                    return { ...acc, ...curr.data };
                }, {});
            })
        );
    }

    private readonly ngDestroy$ = new Subject<void>();

    constructor(
        private readonly wizardState: OrderWizardStateService,
        private readonly route: ActivatedRoute,
        private readonly cd: ChangeDetectorRef,
        private readonly stepComponent: StepComponent<unknown>
    ) {}

    public ngOnInit(): void {
        this.subscribeAll();
    }

    public ngOnDestroy(): void {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }

    public nextStep(): void {
        this.wizardState.nextStep();
    }

    public prevStep(): void {
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

    private subscribeOutputCurrentState(): void {
        this.stepComponent.outputData$.pipe(takeUntil(this.ngDestroy$)).subscribe(state => {
            this.wizardState.setCurrentStepState(state);
            this.cd.markForCheck();
        });
    }

    private subscribeAll(): void {
        this.subscribeInputContext();
        this.subscribeInputCurrentState();
        this.subscribeOutputCurrentState();
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
