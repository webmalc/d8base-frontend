import { FormControl, ValidationErrors } from '@angular/forms';

export function noWhitespaces(control: FormControl): ValidationErrors | null {
  const value = control.value ?? '';
  if (typeof value !== 'string') {
    return null;
  }

  const regex = /\s/;
  const hasWhitespace = Boolean(regex.exec(value));
  return hasWhitespace ? { whitespaces: true } : null;
}
