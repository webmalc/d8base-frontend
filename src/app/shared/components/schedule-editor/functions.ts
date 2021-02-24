import { FormControl, FormGroup } from '@angular/forms';
import { AbstractSchedule } from '@app/core/models/abstract-schedule';
import { ScheduleEditorFormFields } from './schedule-editor-form-fields.enum';
import * as CustomValidators from './custom-validators';

function normalizeTimeFormat(time: string | null): string {
  // convert "HH:MM:SS" to "HH:MM"
  return time?.substr(0, 5);
}

export function normalizeScheduleFormat(schedule: AbstractSchedule): AbstractSchedule {
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
  return new FormGroup({
    [ScheduleEditorFormFields.Day]: new FormControl(dayCode),
    [ScheduleEditorFormFields.StartTime]: new FormControl(startTime),
    [ScheduleEditorFormFields.EndTime]: new FormControl(endTime),
  }, {
    validators: [
      CustomValidators.startTimeValidator,
      CustomValidators.endTimeValidator,
      CustomValidators.startTimeFormatValidator,
      CustomValidators.endTimeFormatValidator,
      CustomValidators.timeIntervalValidator,
    ],
  });
}
