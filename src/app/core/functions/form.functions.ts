import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

type FormControlWithChildren = FormGroup | FormArray;

function hasChildren(control: AbstractControl): control is FormControlWithChildren {
  return control instanceof FormGroup || control instanceof FormArray;
}

export function updateAllValueAndValidity(form: FormGroup | FormArray): void {
  Object.keys(form.controls).forEach(name => {
    const control = form.controls[name];
    if (hasChildren(control)) {
      updateAllValueAndValidity(control);
    } else {
      control.updateValueAndValidity();
    }
  });
}
