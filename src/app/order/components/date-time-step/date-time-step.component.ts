import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    OnInit
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StepComponent } from '../../abstract/step';
import {DateTimeStepData} from '../../order-steps';


@Component({
    selector: 'app-date-time-step',
    templateUrl: './date-time-step.component.html',
    styleUrls: ['./date-time-step.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: StepComponent,
            useExisting: forwardRef(() => DateTimeStepComponent)
        }
    ]
})
export class DateTimeStepComponent
    extends StepComponent<DateTimeStepData>
    implements OnInit {
    public readonly form = this.fb.group({
        date: ['', Validators.required],
        time: ['', Validators.required]
    });

    constructor(
        private readonly fb: FormBuilder,
        protected readonly cd: ChangeDetectorRef
    ) {
        super(cd);
    }

    public ngOnInit(): void {
        this.subscribeFormStatus();
    }

    public subscribeFormStatus(): void {
        this.form.statusChanges.subscribe(() => {
            if (this.form.pristine) {
                return;
            }
            const isComplete = this.form.valid;
            const data = isComplete ? this.getStepState() : null;
            this.outputData$.emit({
                isComplete,
                data
            });
        });
    }

    protected onStateChanged(data: DateTimeStepData): void {
        if (!data?.start_datetime) {
            this.form.reset();

            return;
        }
        const start_datetime = data?.start_datetime;
        const date = new Date(Date.parse(start_datetime)).toString();
        this.form.get('date').setValue(date, { emitEvent: false });
        this.form.get('time').setValue(date, { emitEvent: false });
        this.cd.markForCheck();
    }

    private getStepState(): DateTimeStepData {
        const date =
            new Date(this.form.get('date').value)?.toDateString() || '';
        const time =
            new Date(this.form.get('time').value)?.toTimeString() || '';

        return { start_datetime: new Date(`${date} ${time}`).toISOString() };
    }
}
