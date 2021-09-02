import { FormGroup } from '@angular/forms';
import { AggregatedState } from '@app/service/pages/service-wizard-page/interfaces/steps-state.type';

export abstract class StepComponent<T> {
  public form: FormGroup;

  public getState(): T | null {
    return this.form?.valid ? this.form.value : null;
  }

  public setState(data: AggregatedState): void {
    if (!data) {
      return;
    }
    this.form?.patchValue(data);
  }
}
