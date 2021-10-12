import { FormGroup } from '@angular/forms';
import StepContext from '@app/order/interfaces/step-context.interface';

export abstract class StepComponent<T> {
  public outputData: T;
  public form: FormGroup;

  protected context: StepContext = null;

  public abstract setState(state: T): void;

  public setContext(context: StepContext): void {
    this.context = context;
  }
}
