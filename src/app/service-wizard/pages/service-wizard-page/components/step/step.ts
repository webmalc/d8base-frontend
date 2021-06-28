import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ServiceStepContext } from '../../interfaces/step-context.interface';

@Component({
  template: '',
})
export abstract class ServiceStepComponent<T> implements OnDestroy {
  public outputData: T;
  public isValid$ = new BehaviorSubject<boolean>(false);
  protected context: ServiceStepContext = null;

  protected readonly ngDestroy$ = new Subject<void>();

  constructor(protected readonly cd: ChangeDetectorRef) {}

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  public setState(state: T): void {
    this.onStateChanged(state);
    this.cd.markForCheck();
  }

  public setContext(context: ServiceStepContext): void {
    this.onContextChanged(context);
    this.cd.markForCheck();
  }

  protected abstract onStateChanged(data: T): void;

  protected onContextChanged(context: ServiceStepContext): void {
    this.context = context;
  }
}
