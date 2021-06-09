import { FormControl, ValidationErrors } from '@angular/forms';

export function forbidNumericValue(control: FormControl): ValidationErrors | null {
  if (control.value && /^([0-9]*)$/.test(control.value)) {
    return {
      forbidNumericValue: true,
    };
  }

  return null;
}
