import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Professional } from '@app/api/models';
import { isFormInvalid } from '@app/core/functions/form.functions';

@Component({
  selector: 'app-master-edit',
  templateUrl: './master-edit.component.html',
  styleUrls: ['./master-edit.component.scss'],
})
export class MasterEditComponent {
  @Output() public saveEmitter = new EventEmitter<Professional>();

  public nameControl = new FormControl('');
  public descriptionControl = new FormControl(null);
  public companyControl = new FormControl(null);
  public experienceControl = new FormControl(null);
  public levelControl = new FormControl(null);
  public categoryControl = new FormControl(NaN);
  public subcategoryControl = new FormControl(NaN);
  public form: FormGroup;
  public levelOptions = ['junior', 'middle', 'senior'];

  private initialValue: Professional;

  constructor() {
    this.form = this.createForm();
  }

  @Input()
  public set item(item: Professional) {
    this.initialValue = item;
    this.setFormValues(item);
  }

  public save(): void {
    if (isFormInvalid(this.form)) {
      return;
    }
    const updatedValue: Professional = {
      ...this.initialValue,
      ...this.form.value,
      experience: this.experienceControl.value || null,
      subcategory: this.subcategoryControl.value?.id,
    };
    this.saveEmitter.emit(updatedValue);
  }

  private createForm(): FormGroup {
    const controls: { [key in keyof Partial<Professional>]: FormControl } = {
      name: this.nameControl,
      description: this.descriptionControl,
      company: this.companyControl,
      experience: this.experienceControl,
      level: this.levelControl,
      subcategory: this.subcategoryControl,
    };
    return new FormGroup(controls);
  }

  private setFormValues(values: Professional): void {
    this.form.patchValue(values);
  }
}
