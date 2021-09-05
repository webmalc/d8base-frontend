import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgDestroyService } from '@app/core/services';
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
  minutes = minutes ?? 0;
  const days = (minutes - (minutes % MINUTES_IN_DAY)) / MINUTES_IN_DAY;
  minutes = minutes - days * MINUTES_IN_DAY;
  const hours = (minutes - (minutes % MINUTES_IN_HOUR)) / MINUTES_IN_HOUR;
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
    NgDestroyService,
  ],
})
export class DurationEditorComponent implements ControlValueAccessor {
  public isDisabled: boolean;
  public formFields = DurationFormFields;
  public form: FormGroup;

  constructor(private readonly destroy$: NgDestroyService) {
    this.createForm();
    this.subscribeOnFormValueChanges();
  }

  public registerOnChange(fn: (v: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public writeValue(value: number): void {
    this.form.setValue(durationFromMinutes(value), { emitEvent: false });
  }

  private createForm(): void {
    this.form = new FormGroup({
      [DurationFormFields.Days]: new FormControl(0),
      [DurationFormFields.Hours]: new FormControl(0),
      [DurationFormFields.Minutes]: new FormControl(0),
    });
  }

  private subscribeOnFormValueChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      const duration = minutesFromDuration(value);
      this.onChange(duration);
    });
  }

  private onChange: (v: number) => void = () => null;
  private onTouched: () => void = () => null;
}
