import { Location } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiListResponseInterface } from '@app/core/interfaces/api-list-response.interface';
import { Master } from '@app/core/models/master';
import { Subcategory } from '@app/core/models/subcategory';
import { ProfessionalsService } from '@app/api/services';
import { AbstractEditComponent } from '@app/shared/abstract/abstract-edit-component';
import { plainToClass } from 'class-transformer';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

enum EditMasterFormFields {
  name = 'name',
  description = 'description',
  company = 'company',
  experience = 'experience',
  level = 'level',
  subcategory = 'subcategory',
  is_auto_order_confirmation = 'is_auto_order_confirmation',
}
@Component({
  selector: 'app-master-edit',
  templateUrl: './master-edit.component.html',
  styleUrls: ['./master-edit.component.scss'],
})
export class MasterEditComponent extends AbstractEditComponent<Master> implements OnInit, OnChanges {
  public formFields = EditMasterFormFields;
  public form: FormGroup = this.fb.group({
    [this.formFields.name]: [null],
    [this.formFields.description]: [null],
    [this.formFields.company]: [null],
    [this.formFields.experience]: [null],
    [this.formFields.level]: [null],
    [this.formFields.subcategory]: [null],
    [this.formFields.is_auto_order_confirmation]: [null],
  });
  public subcategoriesList$: BehaviorSubject<Subcategory[]> = new BehaviorSubject<Subcategory[]>([]);
  public levelOptions = ['junior', 'middle', 'senior'];

  constructor(
    private readonly professionalsApi: ProfessionalsService,
    public readonly location: Location,
    private readonly fb: FormBuilder,
  ) {
    super();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      this.form.patchValue(this.item ?? {});
    }
  }

  public ngOnInit(): void {
    this.initSubcategoriesList().subscribe();
  }

  protected transform(data: Master): Master {
    return plainToClass(Master, { ...data, ...this.form.getRawValue() });
  }

  private initSubcategoriesList(): Observable<any> {
    return this.professionalsApi.professionalsSubcategoriesList({}).pipe(
      tap((data: ApiListResponseInterface<Subcategory>) => this.subcategoriesList$.next(data.results)),
    );
  }
}
