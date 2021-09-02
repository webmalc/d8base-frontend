import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgDestroyService } from '@app/core/services';
import { CategoryStepFormFields } from '../../enums/category-step.form-fields';
import { CategoryStepData } from '../../interfaces/category-step-data.interface';
import { StepComponent } from '../step/step';

@Component({
  selector: 'app-category-step',
  templateUrl: './category-step.component.html',
  styleUrls: ['./category-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: StepComponent,
      useExisting: forwardRef(() => CategoryServiceStepComponent),
    },
    NgDestroyService,
  ],
})
export class CategoryServiceStepComponent extends StepComponent<CategoryStepData> {
  public formFields = CategoryStepFormFields;

  constructor(private readonly fb: FormBuilder, private readonly ngDestroy$: NgDestroyService) {
    super();
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      [this.formFields.Category]: [null, Validators.required],
      [this.formFields.Subcategory]: [null, Validators.required],
    });
  }
}
