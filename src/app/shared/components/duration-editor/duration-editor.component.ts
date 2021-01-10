import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DurationFormFields } from './duration-form-fields';
import { Duration } from './duration.interface';

const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const MINUTES_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR;

function minutesFromDuration({ days, hours, minutes }: Duration): number {
  return (days || 0) * MINUTES_IN_DAY + (hours || 0) * MINUTES_IN_HOUR + (minutes || 0);
}

function durationFromMinutes(minutes: number): Duration {
  const days = (minutes - minutes % MINUTES_IN_DAY) / MINUTES_IN_DAY;
  minutes = minutes - days * MINUTES_IN_DAY;
  const hours = (minutes - minutes % MINUTES_IN_HOUR) / MINUTES_IN_HOUR;
  minutes = minutes - hours * MINUTES_IN_HOUR;

  return { days, hours, minutes };
}

@Component({
  selector: 'app-duration-editor',
  templateUrl: './duration-editor.component.html',
  styleUrls: ['./duration-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationEditorComponent),
      multi: true,
    },
  ],
})
export class DurationEditorComponent implements ControlValueAccessor, OnDestroy {
  public isDisabled: boolean;
  public formFields = DurationFormFields;
  public form: FormGroup;

  private readonly destroy$ = new Subject<void>();

  constructor() {
    this.createForm();
    this.subscribeOnFormValueChanges();
  }

  public registerOnChange(fn: (v: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    // can't be disabled
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public writeValue(value: number): void {
    if (!value) {
      this.form.reset({}, { emitEvent: false });

      return;
    }
    this.form.setValue(durationFromMinutes(value), { emitEvent: false });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  private createForm(): void {
    this.form = new FormGroup({
      [DurationFormFields.Days]: new FormControl(),
      [DurationFormFields.Hours]: new FormControl(),
      [DurationFormFields.Minutes]: new FormControl(),
    });
  }

  private subscribeOnFormValueChanges(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => this.onChange(minutesFromDuration(value)));
  }

  private onChange: (v: number) => void = () => null;
}
