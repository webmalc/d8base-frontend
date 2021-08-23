import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfessionalCalendar } from '@app/api/models';
import { ScheduleService } from '@app/api/services';
import { addDays, getLocalDateString } from '@app/core/functions/datetime.functions';
import { StepComponent } from '@app/order/abstract/step';
import DateTimeStepData from '@app/order/interfaces/date-time-step-data.interface';
import StepContext from '@app/order/interfaces/step-context.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-date-time-step',
  templateUrl: './date-time-step.component.html',
  styleUrls: ['./date-time-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: StepComponent,
      useExisting: forwardRef(() => DateTimeStepComponent),
    },
  ],
})
export class DateTimeStepComponent extends StepComponent<DateTimeStepData> implements OnInit {
  public readonly formControl = new FormControl(null, Validators.required);
  public displayedCalendars$: Observable<ProfessionalCalendar[]>;
  public duration: number;

  private readonly currentlyViewedDate = new BehaviorSubject<Date>(new Date());
  private readonly professional$ = new BehaviorSubject<number>(NaN);

  constructor(private readonly scheduleApi: ScheduleService, protected readonly cd: ChangeDetectorRef) {
    super(cd);
    this.form = new FormGroup({
      datetime: this.formControl,
    });
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
    this.updateServiceProfessional(context.service.professional);
    this.duration = context.service.duration;
  }

  private updateCalendars(): void {
    this.displayedCalendars$ = this.currentlyViewedDate.pipe(
      switchMap(startDate => {
        const masterId = this.context?.professional.id;
        const serviceId = this.context?.service.id;
        const endDate = addDays(startDate, 1);

        return !masterId || !serviceId
          ? of(null)
          : this.scheduleApi.scheduleCalendarList({
              professional: masterId?.toString(),
              service: serviceId?.toString(),
              startDatetime: getLocalDateString(startDate),
              endDatetime: getLocalDateString(endDate),
            });
      }),
    );
  }

  private updateServiceProfessional(professional: number) {
    this.professional$.next(professional);
  }

  private subscribeFormStatus(): void {
    this.form.statusChanges.subscribe(() => {
      this.outputData = this.form.valid ? this.getStepState() : null;
    });
  }

  private getStepState(): DateTimeStepData {
    const datetime = this.form.get('datetime').value;

    return { start_datetime: new Date(datetime).toISOString() };
  }
}
