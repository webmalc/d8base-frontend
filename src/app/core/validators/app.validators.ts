import {FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

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
    static restrictEnum(params: Array<string>): ValidatorFn {
        return (control: FormControl): ValidationErrors | null => {
            if (control.value && !params.includes(control.value)) {
                return {
                    restrictEnum: true
                };
            }
            return null;
        };
    }

    static restrictEnumArray(params: Array<string>): ValidatorFn {
        return (control: FormControl): ValidationErrors | null => {
            if (control.value) {
                for (const value of control.value) {
                    if (!params.includes(value)) {
                        return {
                            restrictEnumArray: true
                        };
                    }
                }
            }

            return null;
        };
    }

}
