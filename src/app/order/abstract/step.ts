import { ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import StepContext from '@app/order/interfaces/step-context.interface';

export abstract class StepComponent<T> {
  public outputData: T;
  public form: FormGroup;

  protected context: StepContext = null;

  protected constructor(protected readonly cd: ChangeDetectorRef) {}

  public setState(state: T): void {
    this.onStateChanged(state);
    this.cd.markForCheck();
  }

  public setContext(context: StepContext): void {
    this.onContextChanged(context);
    this.cd.markForCheck();
  }

  protected abstract onStateChanged(data: T): void;

  protected onContextChanged(context: StepContext): void {
    this.context = context;
  }
}
