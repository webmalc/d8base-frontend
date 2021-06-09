import { AbstractControl, ValidationErrors } from '@angular/forms';

const EMAIL_REGEXP = new RegExp(
  '^(([^<>()\\[\\]\\\\.,;:\\s@"]+' +
  '(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]' +
  '{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
);
const isEmptyInputValue = (value: any): boolean => value === null || value.length === 0;

export function email(control: AbstractControl): ValidationErrors | null {
  if (isEmptyInputValue(control.value)) {
    return null;
  }
  return EMAIL_REGEXP.test(control.value) ? null : { email: true };
}
