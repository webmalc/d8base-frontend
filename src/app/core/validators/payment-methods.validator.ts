import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Price } from '@app/api/models/price';

export function paymentMethods(control: AbstractControl): ValidationErrors | null {
  const value = control.value as Price;
  if (!value?.payment_methods?.length) {
    return { paymentMethodsRequired: true };
  }

  return null;
}
