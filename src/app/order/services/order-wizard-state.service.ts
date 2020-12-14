import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, from, Observable, of, Subject } from 'rxjs';
import { catchError, filter, first, map, switchMap } from 'rxjs/operators';
import { SentOrder } from '../../core/models/sent-order';
import { StorageManagerService } from '../../core/proxies/storage-manager.service';
import { OrderIds, orderWizardStorageKey, ORDER_STEPS, StepContext, StepModel, StepsState, StepState } from '../order-steps';

const initState: StepsState = ORDER_STEPS.ids.reduce((acc, curr) => {
    return { ...acc, [curr]: { isComplete: false, data: null } };
}, {});

@Injectable()
export class OrderWizardStateService {
    private readonly steps = ORDER_STEPS;

    private readonly currentStep$ = new BehaviorSubject<StepModel>(this.steps.byId[this.steps.ids[0]]);
    private readonly state$ = new BehaviorSubject<StepsState>(null);
    private readonly context$ = new BehaviorSubject<StepContext>(null);
    private readonly reset$ = new Subject<void>();
    private readonly submit$ = new Subject<void>();
    private readonly isStateEmpty$: Observable<boolean> = this.state$.pipe(
        map(state => {
            return !state || JSON.stringify(initState) === JSON.stringify(this.state$.value);
        })
    );
    private path: string;
    private storageKey: string;

    constructor(private readonly router: Router, private readonly storage: StorageManagerService) {}

    public submit(): Observable<void> {
        return this.submit$.asObservable();
    }

    public doSubmit(): void {
        this.submit$.next();
    }

    public getCurrentStep(): Observable<StepModel> {
        return this.currentStep$.asObservable();
    }

    public setCurrentStep(id: OrderIds): void {
        return this.currentStep$.next(this.steps.byId[id]);
    }

    public getState(): Observable<StepsState> {
        return this.state$.asObservable();
    }

    public getStepStateById(id: string): Observable<StepState<any>> {
        return this.getState().pipe(
            filter(state => Boolean(state)),
            map(state => state[id])
        );
    }

    public getCurrentStepState(): Observable<StepState<any>> {
        return this.getStepStateById(this.getIdOfCurrentStep());
    }

    public setStepStateById(id: string, data: StepState<any> = initState[id]): void {
        const newState = {
            ...this.state$.value,
            [id]: data
        };
        this.state$.next(newState);
        this.storage.set(this.storageKey, newState);
    }

    public setCurrentStepState(data: StepState<any>): void {
        this.setStepStateById(this.getIdOfCurrentStep(), data);
    }

    public nextStep(): void {
        of(1)
            .pipe(
                switchMap(() => this.isAbleToNext()),
                filter(isAbleToNext => isAbleToNext),
                first()
            )
            .subscribe(() => {
                const index = this.getIndexOfCurrentStep();
                this.currentStep$.next(this.steps.byId[this.steps.ids[index + 1]]);
                this.navigateToCurrentStep();
            });
    }

    public prevStep(): void {
        of(1)
            .pipe(
                switchMap(() => this.isAbleToPrev()),
                filter(isAbleToPrev => isAbleToPrev)
            )
            .subscribe(() => {
                const index = this.getIndexOfCurrentStep();
                this.currentStep$.next(this.steps.byId[this.steps.ids[index - 1]]);
                this.navigateToCurrentStep();
            });
    }

    public isLastStep(): Observable<boolean> {
        return this.currentStep$.asObservable().pipe(map(({ id }) => this.steps.ids.lastIndexOf(id) === this.steps.ids.length - 1));
    }

    public isAbleToNext(): Observable<boolean> {
        return combineLatest([this.isLastStep(), this.getCurrentStepState()]).pipe(
            map(([isLastStep, stepState]) => {
                return !isLastStep && stepState.isComplete;
            })
        );
    }

    public isAbleToPrev(): Observable<boolean> {
        return of(this.steps.ids.indexOf(this.getIdOfCurrentStep()) !== 0);
    }

    public navigateToCurrentStep(): void {
        this.router.navigate([this.path, this.getIdOfCurrentStep()]);
    }

    public finalize(result: SentOrder): void {
        this.resetWizard();
        this.router.navigate(['order', 'done']);
    }

    public setContext(context$: Observable<StepContext>): void {
        context$
            .pipe(
                switchMap(context => {
                    const { service, client } = context;
                    this.storageKey = `${orderWizardStorageKey}/${client?.id}/${service?.id}`;

                    return from(this.storage.get(this.storageKey)).pipe(map(state => ({ context, state })));
                }),
                catchError(err => of(err))
            )
            .subscribe(({ context, state }) => {
                const { service } = context;
                this.setPath(`order/${service?.id}`);
                this.state$.next(state ?? initState);
                this.context$.next(context);
            });
    }

    public getContext(): Observable<StepContext> {
        return this.context$.asObservable().pipe(filter(context => Boolean(context)));
    }

    public isStateEmpty(): Observable<boolean> {
        return this.isStateEmpty$;
    }

    public getFirstStep(): Observable<StepModel> {
        const { byId, ids } = this.steps;

        return of(byId[ids[0]]);
    }

    public setPath(path: string): void {
        this.path = path;
    }

    public resetWizard(): void {
        this.clearState();
        this.context$.next(null);
        this.currentStep$.next(this.steps.byId[this.steps.ids[0]]);
        this.state$.next(initState);
        this.path = null;
        this.reset$.next();
    }

    public isReset(): Observable<void> {
        return this.reset$.asObservable();
    }

    private clearState(): void {
        this.storage.remove(this.storageKey);
    }

    private getIdOfCurrentStep(): string {
        return this.currentStep$.value.id;
    }

    private getIndexOfCurrentStep(): number {
        return this.steps.ids.indexOf(this.getIdOfCurrentStep());
    }
}
