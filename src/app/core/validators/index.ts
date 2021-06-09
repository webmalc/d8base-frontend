import { Validators } from '@angular/forms';
import { forbidNumericValue } from './non-numeric.validator';

export * from './email.validator';
export * from './password-validators';
export * from './non-numeric.validator';
export * from './price.validator';

export const passwordValidators = Validators.compose([
  Validators.required,
  Validators.minLength(8),
  forbidNumericValue,
]);
