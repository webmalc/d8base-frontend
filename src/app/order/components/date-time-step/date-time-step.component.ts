import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepComponent } from '@app/order/abstract/step';
import DateTimeStepData from '@app/order/interfaces/date-time-step-data.interface';
import StepContext from '@app/order/interfaces/step-context.interface';
import { BehaviorSubject } from 'rxjs';

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
  public duration: number;

  private readonly professional$ = new BehaviorSubject<number>(NaN);

  constructor() {
    super();
    this.form = new FormGroup({
      datetime: this.formControl,
    });
  }

  public get serviceId(): number {
    return this.context?.service?.id;
  }

  public get professionalId(): number {
    return this.context?.professional?.id;
  }

  public ngOnInit(): void {
    this.subscribeFormStatus();
  }

  public setState(data: DateTimeStepData): void {
    if (!data?.start_datetime) {
      this.form.reset();

      return;
    }
    const start_datetime = data?.start_datetime;
    this.formControl.setValue(new Date(start_datetime));
  }

  public setContext(context: StepContext): void {
    super.setContext(context);
    this.updateServiceProfessional(context.service.professional);
    this.duration = context.service.duration;
  }

  private updateServiceProfessional(professional: number): void {
    this.professional$.next(professional);
  }

  private subscribeFormStatus(): void {
    this.form.statusChanges.subscribe(() => {
      this.outputData = this.form.valid ? this.getStepState() : null;
    });
  }

  private getStepState(): DateTimeStepData {
    const datetime: Date = this.formControl.value;
    return { start_datetime: datetime.toISOString() };
  }
}
