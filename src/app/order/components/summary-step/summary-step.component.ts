import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core';
import { StepComponent } from '@app/order/abstract/step';

@Component({
    selector: 'app-summary-step',
    templateUrl: './summary-step.component.html',
    styleUrls: ['./summary-step.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: StepComponent,
            useExisting: forwardRef(() => SummaryStepComponent)
        }
    ]
})
export class SummaryStepComponent extends StepComponent<void> implements OnInit {
    public ngOnInit(): void {
        this.isValid$.next(true);
    }

    protected onStateChanged(data: unknown): void {
        return;
    }
}
