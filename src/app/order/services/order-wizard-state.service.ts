import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {OrderIds} from '@app/order/enums/order-ids.enum';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {filter, first, map, switchMap} from 'rxjs/operators';
import StepContext from '../interfaces/step-context.interface';
import StepModel from '../interfaces/step-model.interface';
import { StepsState } from '../interfaces/steps-state.type';
import {initState, orderWizardStorageKey, ORDER_STEPS} from '../order-steps';

@Injectable()
export class OrderWizardStateService {
    private readonly steps = ORDER_STEPS;

    private readonly currentStep$ = new BehaviorSubject<StepModel>(this.steps.byId[this.steps.ids[0]]);
    private readonly state$ = new BehaviorSubject<StepsState>(null);
    private readonly context$ = new BehaviorSubject<StepContext>(null);
    private readonly reset$ = new Subject<void>();
    private readonly submit$ = new Subject<StepsState>();
    private readonly isStateEmpty$: Observable<boolean> = this.state$.pipe(
        map(state => {
            return !state || JSON.stringify(initState) === JSON.stringify(state);
        })
    );
    private path: string;
    private storageKey: string;

    constructor(private readonly router: Router, private readonly storage: StorageManagerService) {
    }

    public submit(): Observable<StepsState> {
        return this.submit$.asObservable();
    }

    public doSubmit(): void {
        this.submit$.next(this.state$.value);
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

    public getStepStateById(id: string): Observable<any> {
        return this.getState().pipe(
            filter(state => Boolean(state)),
            map(state => state[id])
        );
    }

    public getCurrentStepState(): Observable<any> {
        return this.getStepStateById(this.getIdOfCurrentStep());
    }

    public async setStepStateById(id: string, data: any = initState[id]): Promise<void> {
        const newState: StepsState = {
            ...this.state$.value,
            [id]: data
        };
        this.state$.next(newState);
        await this.storage.set(this.storageKey, newState);
    }

    public setCurrentStepState(data: any): void {
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
        return this.currentStep$.asObservable().pipe(map(({id}) => this.steps.ids.lastIndexOf(id) === this.steps.ids.length - 1));
    }

    public isAbleToNext(): Observable<boolean> {
        return this.isLastStep().pipe(map(isLastStep => !isLastStep));
    }

    public isAbleToPrev(): Observable<boolean> {
        return of(this.steps.ids.indexOf(this.getIdOfCurrentStep()) !== 0);
    }

    public navigateToCurrentStep(): void {
        this.router.navigate([this.path, this.getIdOfCurrentStep()]);
    }

    public async setContext(context: StepContext): Promise<void> {
        const {service, client} = context;
        this.storageKey = `${orderWizardStorageKey}/${client?.id}/${service?.id}`;
        const state: StepsState = await this.storage.get(this.storageKey);
        this.setPath(`order/${service?.id}`);
        this.state$.next(state ?? initState);
        this.context$.next(context);
    }

    public getContext(): Observable<StepContext> {
        return this.context$.asObservable().pipe(filter(context => Boolean(context)));
    }

    public isStateEmpty(): Observable<boolean> {
        return this.isStateEmpty$;
    }

    public getFirstStep(): Observable<StepModel> {
        const {byId, ids} = this.steps;

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
