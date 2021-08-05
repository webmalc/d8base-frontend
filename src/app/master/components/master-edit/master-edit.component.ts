import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Professional } from '@app/api/models';
import { professionalLevels } from '@app/core/constants/professional.constants';
import { isFormInvalid } from '@app/core/functions/form.functions';
import { CategoriesApiCache, SubcategoriesApiCache } from '@app/core/services/cache';
import { map, switchMap } from 'rxjs/operators';

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
  public levelOptions = professionalLevels;

  private initialValue: Professional;

  constructor(
    private readonly categoryCache: CategoriesApiCache,
    private readonly subcategoryCache: SubcategoriesApiCache,
  ) {
    this.form = this.createForm();
  }

  @Input()
  public set item(item: Professional) {
    this.initialValue = item;
    if (item) {
      this.setFormValues({
        name: item.name,
        description: item.description,
        company: item.company,
        experience: item.experience,
        level: item.level,
      });
    } else {
      this.form.reset();
    }
    if (item?.subcategory) {
      this.setSubcategory(item.subcategory);
    }
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

  private setFormValues(values: Partial<Professional>): void {
    this.form.patchValue(values);
  }

  private setSubcategory(subcategoryId: number): void {
    this.subcategoryCache
      .getByEntityId(subcategoryId)
      .pipe(
        switchMap(subcategory =>
          this.categoryCache.getByEntityId(subcategory.category).pipe(map(category => [category, subcategory])),
        ),
      )
      .subscribe(([category, subcategory]) => {
        this.categoryControl.setValue(category);
        this.subcategoryControl.setValue(subcategory);
      });
  }
}
