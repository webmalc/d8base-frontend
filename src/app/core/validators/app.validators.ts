import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

const EMAIL_REGEXP = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+' +
'(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]' +
'{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
const isEmptyInputValue = (value: any): boolean => value === null || value.length === 0;

export class AppValidators {
  /**
   * @description
   * Validator that requires the control's value pass an list validation set.
   *
   * @usageNotes
   *
   * ### Validate that the field matches an any value in the list
   *
   * ```typescript
   * const control = new FormControl('gender', Validators.restrictEnum(['male', 'female']);
   *
   * console.log(control.errors); // {restringEnum: true}
   * ```
   *
   * @returns An error map with the `email` property
   * if the validation check fails, otherwise `null`.
   *
   * @see `updateValueAndValidity()`
   *
   */

  public static email(control: AbstractControl): ValidationErrors | null {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    return EMAIL_REGEXP.test(control.value) ? null : { email: true };
  }

  public static restrictEnum(params: Array<string>): ValidatorFn {
    return (control: FormControl): ValidationErrors | null => {
      if (control.value && !params.includes(control.value)) {
        return {
          restrictEnum: true,
        };
      }

      return null;
    };
  }

  public static restrictEnumArray(params: Array<string>): ValidatorFn {
    return (control: FormControl): ValidationErrors | null => {
      if (control.value) {
        for (const value of control.value) {
          if (!params.includes(value)) {
            return {
              restrictEnumArray: true,
            };
          }
        }
      }

      return null;
    };
  }

  public static forbidNumericValue(control: FormControl): ValidationErrors | null {
    if (control.value && /^([0-9]*)$/.test(control.value)) {
      return {
        forbidNumericValue: true,
      };
    }

    return null;
  }
}
