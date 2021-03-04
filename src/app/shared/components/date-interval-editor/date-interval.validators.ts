import { AbstractControl, ValidatorFn } from '@angular/forms';
import DateInterval from './date-interval.interface';

export const ongoingValidator: ValidatorFn = (control: AbstractControl) => {
  const data: DateInterval = control.value;
  if (!data) {
    return null;
  }

  if (!data.isOngoing && !data.endDate && !!data.startDate) {
    return { emptyEndDate: true };
  }

  if (!!data.endDate && !data.startDate) {
    return { emptyStartDate: true };
  }

  return null;
};
