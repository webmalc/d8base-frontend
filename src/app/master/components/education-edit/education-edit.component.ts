import { Location } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Education } from '@app/master/models/education';
import { AbstractEditComponent } from '@app/shared/abstract/abstract-edit-component';
import { plainToClass } from 'class-transformer';

enum EducationFormFields {
  university = 'university',
  deegree = 'deegree',
  field_of_study = 'field_of_study',
  is_still_here = 'is_still_here',
  start_date = 'start_date',
  end_date = 'end_date',
  description = 'description',
}

@Component({
  selector: 'app-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.scss'],
})
export class EducationEditComponent extends AbstractEditComponent<Education> implements OnInit, OnChanges {
  public readonly formFields = EducationFormFields;
  public form: FormGroup = this.fb.group({
    [this.formFields.university]: [null, Validators.required],
    [this.formFields.deegree]: [null],
    [this.formFields.field_of_study]: [null],
    [this.formFields.is_still_here]: [null],
    [this.formFields.start_date]: [null],
    [this.formFields.end_date]: [null],
    [this.formFields.description]: [null],
  });

  constructor(private readonly location: Location, private readonly fb: FormBuilder) {
    super();
  }

  public ngOnInit(): void {
    this.handleIsStillHereControl();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      this.form.patchValue(this.item ?? {});
    }
  }

  protected transform(data: Education): Education {
    const trans: Education = plainToClass(Education, { ...data, ...this.form.getRawValue() });
    trans.formatDates();

    return trans;
  }

  private handleIsStillHereControl(): void {
    this.form.get(this.formFields.is_still_here).valueChanges.subscribe(value => {
      const action = value ? 'disable' : 'enable';
      [this.formFields.end_date].forEach(control => {
        this.form.get(control)[action]();
        this.form.get(control).reset();
      });
    });
  }
}
