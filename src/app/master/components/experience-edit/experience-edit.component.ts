import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalExperience } from '@app/api/models';
import DateInterval from '@app/shared/components/date-interval-editor/date-interval.interface';
import * as DateIntervalValidators from '@app/shared/components/date-interval-editor/date-interval.validators';

import { ExperienceFormFields } from './experience-form-fields.enum';
import ExperienceFormValue from './experience-form-value.interface';

@Component({
  selector: 'app-experience-edit',
  templateUrl: './experience-edit.component.html',
  styleUrls: ['./experience-edit.component.scss'],
})
export class ExperienceEditComponent {
  @Output() public save = new EventEmitter<ProfessionalExperience>();
  @Output() public delete = new EventEmitter<ProfessionalExperience>();

  public readonly formFields = ExperienceFormFields;
  public form: FormGroup;

  private initialValue: ProfessionalExperience;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      [this.formFields.title]: [null, Validators.required],
      [this.formFields.company]: [null, Validators.required],
      [this.formFields.interval]: [null, DateIntervalValidators.ongoingValidator],
      [this.formFields.description]: [null],
    });
  }

  @Input()
  public set item(value: ProfessionalExperience) {
    const interval: DateInterval = !value?.start_date ? null : {
      startDate: value.start_date,
      endDate: value.end_date,
      isOngoing: value.is_still_here,
    };

    const formValue: ExperienceFormValue = {
      [this.formFields.title]: value?.title,
      [this.formFields.company]: value?.company,
      [this.formFields.interval]: interval,
      [this.formFields.description]: value?.description,
    };
    this.form.patchValue(formValue);
    this.initialValue = value;
  }

  public get item() {
    return this.initialValue;
  }

  public onSave(): void {
    this.save.emit(this.getExperience());
  }

  public onDelete(): void {
    this.delete.emit(this.initialValue);
  }

  private getExperience(): ProfessionalExperience {
    const formValue: ExperienceFormValue = this.form.value;
    return {
      ...this.initialValue,
      title: formValue.title,
      company: formValue.company,
      start_date: formValue.interval?.startDate,
      end_date: formValue.interval?.endDate,
      is_still_here: formValue.interval?.isOngoing,
      description: formValue.description,
    };
  }
}
