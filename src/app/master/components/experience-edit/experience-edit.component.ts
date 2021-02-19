import { Location } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgDestroyService } from '@app/core/services';
import { Experience } from '@app/master/models/experience';
import { AbstractEditComponent } from '@app/shared/abstract/abstract-edit-component';
import { plainToClass } from 'class-transformer';
import { takeUntil } from 'rxjs/operators';

enum ExperienceFormFields {
  title = 'title',
  company = 'company',
  is_still_here = 'is_still_here',
  start_date = 'start_date',
  end_date = 'end_date',
  description = 'description',
}
@Component({
  selector: 'app-experience-edit',
  templateUrl: './experience-edit.component.html',
  styleUrls: ['./experience-edit.component.scss'],
  providers: [NgDestroyService],
})
export class ExperienceEditComponent extends AbstractEditComponent<Experience> implements OnInit, OnChanges {
  public readonly formFields = ExperienceFormFields;
  public form: FormGroup = this.fb.group({
    [this.formFields.title]: [null, Validators.required],
    [this.formFields.company]: [null, Validators.required],
    [this.formFields.is_still_here]: [null],
    [this.formFields.start_date]: [null],
    [this.formFields.end_date]: [null],
    [this.formFields.description]: [null],
  });

  constructor(private readonly location: Location, private readonly fb: FormBuilder, private readonly destroy$: NgDestroyService) {
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

  public locationBack(): void {
    this.location.back();
  }

  protected transform(data: Experience): Experience {
    const transData: Experience = plainToClass(Experience, { ...data, ...this.form.getRawValue() });
    transData.formatDates();

    return transData;
  }

  private handleIsStillHereControl(): void {
    this.form
      .get(this.formFields.is_still_here)
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        const action = value ? 'disable' : 'enable';
        [this.formFields.end_date].forEach(control => {
          this.form.get(control)[action]();
          this.form.get(control).reset();
        });
      });
  }
}
