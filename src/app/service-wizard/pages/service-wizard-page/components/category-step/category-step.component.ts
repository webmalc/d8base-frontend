import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslationService } from '@app/core/services';
import { takeUntil } from 'rxjs/operators';
import { CategoryStepFormFields } from '../../enums/category-step.form-fields';
import { CategoryStepData } from '../../interfaces/category-step-data.interface';
import { ServiceStepContext } from '../../interfaces/step-context.interface';
import { ServiceStepComponent } from '../step/step';

@Component({
  selector: 'app-category-step',
  templateUrl: './category-step.component.html',
  styleUrls: ['./category-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ServiceStepComponent,
      useExisting: forwardRef(() => CategoryServiceStepComponent),
    },
  ],
})
export class CategoryServiceStepComponent extends ServiceStepComponent<CategoryStepData> implements OnInit {
  public formFields = CategoryStepFormFields;
  public form = this.fb.group({
    [this.formFields.Category]: ['', Validators.required],
    [this.formFields.Subcategory]: ['', Validators.required],
  });

  constructor(
    public readonly trans: TranslationService,
    private readonly fb: FormBuilder,
    protected readonly cd: ChangeDetectorRef,
  ) {
    super(cd);
  }

  public ngOnInit(): void {
    this.subscribeFormStatus();
  }

  protected onStateChanged(data: CategoryStepData): void {
    if (!data) {
      return;
    }
    this.form.patchValue(data);
  }

  protected onContextChanged(context: ServiceStepContext): void {
    super.onContextChanged(context);
  }

  private subscribeFormStatus(): void {
    this.form.statusChanges.pipe(takeUntil(this.ngDestroy$)).subscribe(() => {
      this.outputData = this.form.valid ? this.getStepState() : null;
      this.isValid$.next(this.form.valid);
    });
  }

  private getStepState(): CategoryStepData {
    return this.form.value;
  }
}
