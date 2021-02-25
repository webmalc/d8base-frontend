import { FormGroup, ValidationErrors } from '@angular/forms';
import { ScheduleEditorFormFields } from './schedule-editor-form-fields.enum';

export function timeIntervalValidator(group: FormGroup): ValidationErrors | null {
  const startTime = parseInt(
    (group.get(ScheduleEditorFormFields.StartTime).value as string)?.slice(0, 2) +
    (group.get(ScheduleEditorFormFields.StartTime).value as string)?.slice(3, 5),
    10,
  );
  const endTimeTime = parseInt(
    (group.get(ScheduleEditorFormFields.EndTime).value as string)?.slice(0, 2) +
    (group.get(ScheduleEditorFormFields.EndTime).value as string)?.slice(3, 5),
    10,
  );
  if (startTime >= endTimeTime) {
    group.get(ScheduleEditorFormFields.EndTime).setErrors({ timeError: true });
  }

  return null;
}

export function startTimeFormatValidator(group: FormGroup): ValidationErrors | null {
  if ((group.get(ScheduleEditorFormFields.StartTime).value as string)?.length !== 5 ||
    parseInt((group.get(ScheduleEditorFormFields.StartTime).value as string)?.slice(0, 1), 10) > 2 ||
    parseInt((group.get(ScheduleEditorFormFields.StartTime).value as string)?.slice(3, 5), 10) % 15 !== 0
  ) {
    group.get(ScheduleEditorFormFields.StartTime).setErrors({ timeError: true });
  }

  return null;
}

export function endTimeFormatValidator(group: FormGroup): ValidationErrors | null {
  if ((group.get(ScheduleEditorFormFields.EndTime).value as string)?.length !== 5 ||
    parseInt((group.get(ScheduleEditorFormFields.EndTime).value as string)?.slice(0, 1), 10) > 2 ||
    parseInt((group.get(ScheduleEditorFormFields.EndTime).value as string)?.slice(3, 5), 10) % 15 !== 0
  ) {
    group.get(ScheduleEditorFormFields.EndTime).setErrors({ timeError: true });
  }

  return null;
}

export function startTimeValidator(group: FormGroup): ValidationErrors | null {
  if (!group.get(ScheduleEditorFormFields.StartTime).value) {
    group.get(ScheduleEditorFormFields.StartTime).setErrors({ timeError: true });
  }

  return null;
}

export function endTimeValidator(group: FormGroup): ValidationErrors | null {
  if (!group.get(ScheduleEditorFormFields.EndTime).value) {
    group.get(ScheduleEditorFormFields.EndTime).setErrors({ timeError: true });
  }

  return null;
}
