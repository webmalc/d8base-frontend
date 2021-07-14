import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

type FormControlWithChildren = FormGroup | FormArray;

/*
 * Returns `true` if the FormGroup is invalid and updates its children's validity
 */
export function isFormInvalid(form: FormGroup): boolean {
  if (form.invalid) {
    form.markAllAsTouched();
    updateAllValueAndValidity(form);
    return true;
  }
  return false;
}

/*
 * Like updateValueAndValidity() but for child controls
 */
export function updateAllValueAndValidity(form: FormControlWithChildren): void {
  Object.keys(form.controls).forEach(name => {
    const control = form.controls[name];
    if (hasChildren(control)) {
      updateAllValueAndValidity(control);
    } else {
      control.updateValueAndValidity();
    }
  });
}

function hasChildren(control: AbstractControl): control is FormControlWithChildren {
  return control instanceof FormGroup || control instanceof FormArray;
}
