import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getLocalDateString, getMonthDateString } from '@app/core/functions/datetime.functions';
import DateInterval from './date-interval.interface';

@Component({
  selector: 'app-date-interval-editor',
  templateUrl: './date-interval-editor.component.html',
  styleUrls: ['./date-interval-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateIntervalEditorComponent),
      multi: true,
    },
  ],
})
export class DateIntervalEditorComponent implements ControlValueAccessor {
  public startDate: string;
  public endDate: string;
  public isOngoing: boolean;

  private onChange: (value: DateInterval) => void;
  private onTouched: () => void;

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(value: DateInterval): void {
    this.startDate = getMonthDateString(value?.startDate);
    this.endDate = getMonthDateString(value?.endDate);
    this.isOngoing = value?.isOngoing;
  }

  public toggleOngoing(event: CustomEvent) {
    this.isOngoing = event.detail.checked;
    if (this.isOngoing) {
      this.endDate = null;
    }
    this.emitOnChange();
  }

  public setStartDate(event: CustomEvent) {
    this.startDate = event.detail.value;
    this.emitOnChange();
  }

  public setEndDate(event: CustomEvent) {
    this.endDate = event.detail.value;
    this.emitOnChange();
  }

  public setTouched() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  private emitOnChange() {
    if (this.onChange) {
      this.onChange({
        startDate: getLocalDateString(this.startDate),
        endDate: getLocalDateString(this.endDate),
        isOngoing: this.isOngoing,
      });
    }
  }
}
