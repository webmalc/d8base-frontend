import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef } from '@angular/core';
import { StepComponent } from '@app/order/abstract/step';

@Component({
  selector: 'app-summary-step',
  templateUrl: './summary-step.component.html',
  styleUrls: ['./summary-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: StepComponent,
      useExisting: forwardRef(() => SummaryStepComponent),
    },
  ],
})
export class SummaryStepComponent extends StepComponent<void> {
  constructor(protected readonly cd: ChangeDetectorRef) {
    super(cd);
  }

  protected onStateChanged(data: unknown): void {
    return;
  }
}
