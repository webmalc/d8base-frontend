import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Price } from '@app/api/models/price';

export function priceIntervalValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as Partial<Price>;
  const isPriceFixed = value?.is_price_fixed;
  if (!isPriceFixed) {
    const startPrice = value?.start_price;
    const endPrice = value?.end_price;

    if (!startPrice && !endPrice) {
      return { required: true };
    }

    if (parseFloat(startPrice) >= parseFloat(endPrice)) {
      return { priceError: true };
    }
  } else if (!value?.price) {
    return { required: true };
  }

  return null;
}
