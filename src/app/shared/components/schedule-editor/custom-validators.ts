import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { environment } from '@env/environment';
import { ScheduleEditorFormFields } from './schedule-editor-form-fields.enum';

const CALENDAR_INTERVAL = environment.default_calendar_interval;

function getHoursNumber(timeString: string): number {
  return Number.parseInt(timeString.slice(0, 2), 10);
}

function getMinutesNumber(timeString: string): number {
  return Number.parseInt(timeString.slice(3, 5), 10);
}

export function timeIntervalValidator(group: FormGroup): ValidationErrors | null {
  const startTime = group.get(ScheduleEditorFormFields.StartTime).value as string;
  const endTime = group.get(ScheduleEditorFormFields.EndTime).value as string;
  const startTimeMinutes = getHoursNumber(startTime) * 60 + getMinutesNumber(startTime);
  const endTimeMinutes = getHoursNumber(endTime) * 60 + getMinutesNumber(endTime);
  return (startTimeMinutes >= endTimeMinutes) ? { timeCausalityError: true } : null;
}

export function timeFormatValidator(control: FormControl): ValidationErrors | null {
  const time: string = control.value;
  if (!time) {
    return null;
  }

  return getMinutesNumber(time) % CALENDAR_INTERVAL !== 0 ? { timeIntervalError: { interval: CALENDAR_INTERVAL }} : null;
}
