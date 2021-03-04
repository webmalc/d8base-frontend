import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalEducation } from '@app/api/models';
import DateInterval from '@app/shared/components/date-interval-editor/date-interval.interface';
import * as DateIntervalValidators from '@app/shared/components/date-interval-editor/date-interval.validators';
import { EducationFormFields } from './education-form-fields.enum';

import EducationFormValue from './education-form-value.interface';

@Component({
  selector: 'app-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.scss'],
})
export class EducationEditComponent {
  @Output() public save = new EventEmitter<ProfessionalEducation>();
  @Output() public delete = new EventEmitter<ProfessionalEducation>();

  public readonly formFields = EducationFormFields;
  public form: FormGroup;

  private initialValue: ProfessionalEducation;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      [this.formFields.university]: [null, Validators.required],
      [this.formFields.degree]: [null],
      [this.formFields.field_of_study]: [null],
      [this.formFields.interval]: [null, DateIntervalValidators.ongoingValidator],
      [this.formFields.description]: [null],
    });
  }

  public get item() {
    return this.initialValue;
  }

  @Input()
  public set item(value: ProfessionalEducation) {
    const interval: DateInterval = !value?.start_date ? null : {
      startDate: value.start_date,
      endDate: value.end_date,
      isOngoing: value.is_still_here,
    };

    const formValue: EducationFormValue = {
      [this.formFields.university]: value?.university,
      [this.formFields.degree]: value?.deegree,
      [this.formFields.field_of_study]: value?.field_of_study,
      [this.formFields.interval]: interval,
      [this.formFields.description]: value?.description,
    };
    this.form.patchValue(formValue);
    this.initialValue = value;
  }

  public onSave(): void {
    this.save.emit(this.getEducation());
  }

  public onDelete(): void {
    this.delete.emit(this.initialValue);
  }

  private getEducation(): ProfessionalEducation {
    const formValue: EducationFormValue = this.form.value;
    return {
      ...this.initialValue,
      university: formValue.university,
      deegree: formValue.degree,
      field_of_study: formValue.field_of_study,
      start_date: formValue.interval?.startDate,
      end_date: formValue.interval?.endDate,
      is_still_here: formValue.interval?.isOngoing,
      description: formValue.description,
    };
  }
}
