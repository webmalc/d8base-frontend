import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavBranch, NavPath } from '@app/core/constants/navigation.constants';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ServiceIds } from '../enums/service-ids.enum';
import { StepModel } from '../interfaces/step-model.interface';
import { SERVICE_STEPS } from '../service-wizard-steps';

@Injectable()
export class ServiceWizardStateService {
  private readonly steps: StepModel[] = SERVICE_STEPS;
  private readonly currentStepId$ = new BehaviorSubject<ServiceIds>(this.steps[0]?.id);

  constructor(private readonly router: Router) {}

  public get currentStepId(): ServiceIds {
    return this.currentStepId$.value;
  }

  public nextStep(): void {
    this.isLastStep()
      .pipe(first(isLastStep => !isLastStep))
      .subscribe(() => this.goToStep(+1));
  }

  public prevStep(): void {
    this.isFirstStep()
      .pipe(first(isFirstStep => !isFirstStep))
      .subscribe(() => this.goToStep(-1));
  }

  public isLastStep(): Observable<boolean> {
    return this.currentStepId$.pipe(map(id => this.steps.findIndex(s => s.id === id) === this.steps.length - 1));
  }

  public isFirstStep(): Observable<boolean> {
    return this.currentStepId$.pipe(map(id => this.steps.findIndex(s => s.id === id) === 0));
  }

  public getFirstStep(): Observable<StepModel> {
    return of(this.steps[0]);
  }

  public reset(): void {
    this.currentStepId$.next(this.steps[0].id);
  }

  private goToStep(offset: number): void {
    const currentStepId = this.currentStepId$.value;
    const currentStepIndex = this.steps.findIndex(s => s.id === currentStepId);
    const nextStepId = this.steps[currentStepIndex + offset]?.id;
    this.currentStepId$.next(nextStepId);
    this.router.navigate([NavPath.Service, NavBranch.Add, nextStepId]);
  }
}
