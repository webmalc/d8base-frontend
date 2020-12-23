import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HelperService} from '@app/core/services/helper.service';
import {MasterCalendar} from '@app/master/models/master-calendar';
import {CalendarApiService} from '@app/master/services/calendar-api.service';
import {StepComponent} from '@app/order/abstract/step';
import {DateTimeStepData, StepContext} from '@app/order/order-steps';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

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
        datetime: [null, Validators.required]
    });
    public displayedCalendars$: Observable<MasterCalendar[]>;

    private readonly currentlyViewedDate = new BehaviorSubject<Date>(new Date());

    constructor(
        private readonly fb: FormBuilder,
        private readonly calendarApi: CalendarApiService,
        protected readonly cd: ChangeDetectorRef) {
        super(cd);
    }

    public ngOnInit(): void {
        this.subscribeFormStatus();
    }

    public getData(): DateTimeStepData {
        return this.outputData;
    }

    public showCalendarForDate(date: Date): void {
        this.currentlyViewedDate.next(date);
    }

    protected onStateChanged(data: DateTimeStepData): void {
        if (!data?.start_datetime) {
            this.form.reset();

            return;
        }
        const start_datetime = data?.start_datetime;
        this.form.get('datetime').setValue(new Date(start_datetime));
        this.cd.markForCheck();
    }

    protected onContextChanged(context: StepContext): void {
        super.onContextChanged(context);
        this.updateCalendars();
    }

    private updateCalendars(): void {
        this.displayedCalendars$ = this.currentlyViewedDate.pipe(
            switchMap(startDate => {
                const masterId = this.context?.professional.id;
                const serviceId = this.context?.service.id;
                const endDate = HelperService.getDate(startDate, 1);

                return (!masterId || !serviceId) ? of(null) :
                    this.calendarApi.getSchedule(masterId, startDate.toISOString(), endDate.toISOString(), serviceId);
            })
        );
    }

    private subscribeFormStatus(): void {
        this.form.statusChanges.subscribe(() => {
            this.outputData = this.form.valid ? this.getStepState() : null;
            this.isValid$.next(this.form.valid);
        });
    }

    private getStepState(): DateTimeStepData {
        const datetime = this.form.get('datetime').value;

        return {start_datetime: new Date(datetime).toISOString()};
    }
}
