import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ScheduleUnion } from '@app/core/models/schedule-union';
import * as CustomValidators from './custom-validators';
import { ScheduleEditorFormFields } from './schedule-editor-form-fields.enum';

function normalizeTimeFormat(time: string | null): string {
  // convert "HH:MM:SS" to "HH:MM"
  return time?.substr(0, 5);
}

export function normalizeScheduleFormat(schedule: ScheduleUnion): ScheduleUnion {
  return {
    ...schedule,
    start_time: normalizeTimeFormat(schedule.start_time),
    end_time: normalizeTimeFormat(schedule.end_time),
  };
}

export function timeToInt(time: string): number {
  if (time.length !== 5) {
    throw Error('unexpected time string length');
  }

  return parseInt(time.slice(0, 2) + time.slice(3, 5), 10);
}

export function createFormGroup(options: { dayCode: number; startTime?: string; endTime?: string }): FormGroup {
  const { dayCode, startTime, endTime } = options;
  return new FormGroup(
    {
      [ScheduleEditorFormFields.Day]: new FormControl(dayCode),
      [ScheduleEditorFormFields.StartTime]: new FormControl(startTime, [
        Validators.required,
        CustomValidators.timeFormatValidator,
      ]),
      [ScheduleEditorFormFields.EndTime]: new FormControl(endTime, [
        Validators.required,
        CustomValidators.timeFormatValidator,
      ]),
    },
    {
      validators: [CustomValidators.timeIntervalValidator],
    },
  );
}
