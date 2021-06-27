import { Validators } from '@angular/forms';
import { forbidNumericValue } from './non-numeric.validator';
import { noWhitespaces } from './no-whitespaces.validator';

export * from './email.validator';
export * from './password-validators';
export * from './non-numeric.validator';
export * from './price.validator';
export * from './payment-methods.validator';

const MINIMUM_PASSWORD_LENGTH = 8;
const MAXIMUM_PASSWORD_LENGTH = 50;

const MAXIMUM_FIRST_NAME_LENGTH = 30;
const MAXIMUM_LAST_NAME_LENGTH = 150;

export const passwordValidators = Validators.compose([
  Validators.required,
  Validators.minLength(MINIMUM_PASSWORD_LENGTH),
  Validators.maxLength(MAXIMUM_PASSWORD_LENGTH),
  noWhitespaces,
  forbidNumericValue,
]);

export const firstNameValidators = Validators.compose([
  Validators.required,
  Validators.maxLength(MAXIMUM_FIRST_NAME_LENGTH),
]);

export const lastNameValidators = Validators.compose([Validators.maxLength(MAXIMUM_LAST_NAME_LENGTH)]);
