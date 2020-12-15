import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StepComponent } from '@app/order/abstract/step';
import { DateTimeStepData } from '@app/order/order-steps';

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
export class DateTimeStepComponent extends StepComponent<DateTimeStepData> implements OnInit {
    public readonly form = this.fb.group({
        date: ['', Validators.required],
        time: ['', Validators.required]
    });

    constructor(private readonly fb: FormBuilder, protected readonly cd: ChangeDetectorRef) {
        super(cd);
    }

    public ngOnInit(): void {
        this.subscribeFormStatus();
    }

    public subscribeFormStatus(): void {
        this.form.statusChanges.subscribe(() => {
            this.outputData = this.form.valid ? this.getStepState() : null;
            this.isValid$.next(this.form.valid);
        });
    }

    public getData(): DateTimeStepData {
        return this.outputData;
    }

    protected onStateChanged(data: DateTimeStepData): void {
        if (!data?.start_datetime) {
            this.form.reset();

            return;
        }
        const start_datetime = data?.start_datetime;
        const date = new Date(Date.parse(start_datetime)).toString();
        this.form.get('date').setValue(date);
        this.form.get('time').setValue(date);
        this.cd.markForCheck();
    }

    private getStepState(): DateTimeStepData {
        const date = new Date(this.form.get('date').value)?.toDateString() || '';
        const time = new Date(this.form.get('time').value)?.toTimeString() || '';

        return { start_datetime: new Date(`${date} ${time}`).toISOString() };
    }
}
