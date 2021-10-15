import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { NavPath } from '@app/core/constants/navigation.constants';
import { StorageManagerService } from '@app/core/services/storage-manager.service';
import { OrderIds } from '@app/order/enums/order-ids.enum';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { filter, first, map, shareReplay } from 'rxjs/operators';
import StepContext from '../interfaces/step-context.interface';
import StepModel from '../interfaces/step-model.interface';
import StepsModel from '../interfaces/steps-model.interface';
import { StepsState } from '../interfaces/steps-state.type';
import { initState, ORDER_STEPS, orderWizardStorageKey } from '../order-steps';

@Injectable()
export class OrderWizardStateService {
  private steps: StepsModel = ORDER_STEPS;

  private readonly currentStepId$ = new BehaviorSubject<string>(this.steps.ids[0]);
  private readonly state$ = new BehaviorSubject<StepsState>(initState);
  private readonly context$ = new BehaviorSubject<StepContext>(null);
  private readonly reset$ = new Subject<void>();
  private readonly submit$ = new Subject<StepsState>();
  private readonly isStateEmpty$: Observable<boolean> = this.state$.pipe(
    map(state => !state || JSON.stringify(initState) === JSON.stringify(state)),
  );
  private path: string;
  private readonly storageKey: string = orderWizardStorageKey;
  private readonly filteredContext$: Observable<StepContext>;

  constructor(private readonly router: Router, private readonly storage: StorageManagerService) {
    this.filteredContext$ = this.context$.asObservable().pipe(
      filter(context => Boolean(context)),
      shareReplay(1),
    );
  }

  public submit(): Observable<StepsState> {
    return this.submit$.asObservable();
  }

  public doSubmit(data: any): void {
    this.setCurrentStepState(data);
    this.submit$.next(this.state$.value);
  }

  public getCurrentStep(): Observable<StepModel> {
    return this.currentStepId$.pipe(map(id => this.steps.byId[id]));
  }

  public setCurrentStep(id: OrderIds): void {
    return this.currentStepId$.next(id);
  }

  public getState(): Observable<StepsState> {
    return this.state$.asObservable();
  }

  public getStepStateById(id: string): Observable<any> {
    return this.getState().pipe(
      filter(state => Boolean(state)),
      map(state => state[id]),
    );
  }

  public getCurrentStepState(): Observable<any> {
    return this.getStepStateById(this.getIdOfCurrentStep());
  }

  public setCurrentStepState(data: any): void {
    this.setStepStateById(this.getIdOfCurrentStep(), data);
  }

  public nextStep(data: any): void {
    this.setCurrentStepState(data);
    const params = data?.params;
    this.isLastStep()
      .pipe(first(isLastStep => !isLastStep))
      .subscribe(() => this.goToStep(+1, params));
  }

  public prevStep(data: any): void {
    this.setCurrentStepState(data);
    this.isFirstStep()
      .pipe(first(isFirstStep => !isFirstStep))
      .subscribe(() => this.goToStep(-1));
  }

  public isLastStep(): Observable<boolean> {
    return this.currentStepId$.asObservable().pipe(
      map(id => this.steps.ids.lastIndexOf(id) === this.steps.ids.length - 1),
      first(),
    );
  }

  public isFirstStep(): Observable<boolean> {
    return this.currentStepId$.pipe(map(id => this.steps.ids.indexOf(id) === 0));
  }

  public async setContext(context: StepContext): Promise<void> {
    const { service } = context;
    this.path = `${NavPath.Order}/${service?.id}`;
    this.steps = this.getSteps(context);
    this.context$.next(context);
    const state: StepsState = await this.storage.get(this.storageKey);
    this.state$.next(state ?? initState);
  }

  public getContext(): Observable<StepContext> {
    return this.filteredContext$;
  }

  public isStateEmpty(): Observable<boolean> {
    return this.isStateEmpty$;
  }

  public getFirstStep(): Observable<StepModel> {
    const { byId, ids } = this.steps;

    return of(byId[ids[0]]);
  }

  public resetWizard(): { professionalId: number } {
    const professionalId = this.context$.value?.professional?.id;
    this.clearState();
    this.context$.next(null);
    this.currentStepId$.next(this.steps.ids[0]);
    this.state$.next(initState);
    this.path = null;
    this.reset$.next();
    return { professionalId };
  }

  public isReset(): Observable<void> {
    return this.reset$.asObservable();
  }

  private async setStepStateById(id: string, data: any = initState[id]): Promise<void> {
    const newState: StepsState = {
      ...this.state$.value,
      [id]: data,
    };
    this.state$.next(newState);
    await this.storage.set(this.storageKey, newState);
  }

  private goToStep(offset: number, queryParams?: Params): void {
    this.currentStepId$.pipe(first()).subscribe(currentStepId => {
      const index = this.steps.ids.indexOf(currentStepId);
      const nextStepId = this.steps.ids[index + offset];
      this.currentStepId$.next(nextStepId);
      this.router.navigate([this.path, nextStepId], { queryParams });
    });
  }

  private clearState(): void {
    this.storage.remove(this.storageKey);
  }

  private getIdOfCurrentStep(): string {
    return this.currentStepId$.value;
  }

  private getSteps(context: StepContext): StepsModel {
    return ORDER_STEPS;
  }
}
