import { AbstractControl, ValidationErrors } from '@angular/forms';

export const confirmPasswordValidator = (passwordControlName: string, confirmControlName: string) => (
  group: AbstractControl,
): ValidationErrors | null => {
  const isDirtyAndValid = (control: AbstractControl): boolean => control.dirty && control.valid;
  const passwordControl = group.get(passwordControlName);
  const confirmControl = group.get(confirmControlName);

  if (isDirtyAndValid(passwordControl) && isDirtyAndValid(confirmControl)) {
    if (passwordControl.value !== confirmControl.value) {
      return { passwordMismatch: true };
    }
  }

  return null;
};
