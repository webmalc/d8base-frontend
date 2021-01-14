import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { AppValidators } from '@app/core/validators/app.validators';

export const passwordValidators = Validators.compose([Validators.required, Validators.minLength(8), AppValidators.forbidNumericValue]);

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
