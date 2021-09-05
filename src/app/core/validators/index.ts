import { Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { noWhitespaces } from './no-whitespaces.validator';
import { forbidNumericValue } from './non-numeric.validator';

export * from './email.validator';
export * from './password-validators';
export * from './non-numeric.validator';
export * from './price.validator';
export * from './company-name.validator';
export * from './payment-methods.validator';

const MINIMUM_PASSWORD_LENGTH = 8;
const MAXIMUM_PASSWORD_LENGTH = 50;

const MAXIMUM_FIRST_NAME_LENGTH = 30;
const MAXIMUM_LAST_NAME_LENGTH = 150;

const MINIMUM_DESCRIPTION_LENGTH = 20;
const MAXIMUM_SERVICE_NAME_LENGTH = 250;

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

export const descriptionValidator = Validators.minLength(MINIMUM_DESCRIPTION_LENGTH);

export const serviceNameValidator = Validators.maxLength(MAXIMUM_SERVICE_NAME_LENGTH);

export const durationValidator = Validators.min(environment.default_calendar_interval);
