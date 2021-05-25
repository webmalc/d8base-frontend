import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category, ProfessionalList, Subcategory } from '@app/api/models';
import { ProfessionalsService } from '@app/api/services';
import { NgDestroyService } from '@app/core/services';
import { TranslationService } from '@app/core/services/translation.service';
import { ServicePublishStepOneFormFields } from '@app/service/enums/service-publish-step-one-form-fields';
import { ServicePublishSteps } from '@app/service/enums/service-publish-steps';
import { StepOneDataInterface } from '@app/service/interfaces/step-one-data-interface';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import { ServiceStepsNavigationService } from '@app/service/services/service-steps-navigation.service';
import { Reinitable } from '@app/shared/abstract/reinitable';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-service-publish-step-one',
  templateUrl: './service-publish-step-one.component.html',
  styleUrls: ['./service-publish-step-one.component.scss'],
  providers: [NgDestroyService],
})
export class ServicePublishStepOneComponent extends Reinitable {
  @Select(CurrentUserSelectors.defaultProfessional)
  public defaultProfessional$: Observable<ProfessionalList>;

  public formFields = ServicePublishStepOneFormFields;
  public form = this.formBuilder.group({
    [ServicePublishStepOneFormFields.Category]: ['', Validators.required],
    [ServicePublishStepOneFormFields.Subcategory]: ['', Validators.required],
  });
  public categoriesList$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  public subcategoriesList$: BehaviorSubject<Subcategory[]> = new BehaviorSubject<Subcategory[]>([]);

  constructor(
    public readonly trans: TranslationService,
    private readonly professionalsApi: ProfessionalsService,
    private readonly servicePublishDataHolderService: ServicePublishDataHolderService,
    private readonly serviceStepsNavigationService: ServiceStepsNavigationService,
    private readonly destroy$: NgDestroyService,
    private readonly formBuilder: FormBuilder,
  ) {
    super();
    this.subscribeProfessionalSubcategory();
  }

  public submitForm(): void {
    this.servicePublishDataHolderService.setStepData<StepOneDataInterface>(ServicePublishSteps.One, {
      category: this.form.get(this.formFields.Category).value,
      subcategory: this.form.get(this.formFields.Subcategory).value,
    });
    this.serviceStepsNavigationService.next();
  }

  public onCategoryChange(): void {
    this.form.get(this.formFields.Subcategory).reset();
    const category = this.form.get(this.formFields.Category).value.id;
    this.professionalsApi
      .professionalsSubcategoriesList({
        category,
      })
      .subscribe(list => this.subcategoriesList$.next(list.results));
  }

  public isSubmitDisabled(): boolean {
    return this.form.invalid;
  }

  protected init(): void {
    this.professionalsApi.professionalsCategoriesList({}).subscribe(list => this.categoriesList$.next(list.results));

    if (this.servicePublishDataHolderService.isset(ServicePublishSteps.One)) {
      const stepData = this.servicePublishDataHolderService.getStepData<StepOneDataInterface>(ServicePublishSteps.One);
      this.form.patchValue(stepData);
    }
  }

  private subscribeProfessionalSubcategory(): void {
    this.defaultProfessional$
      .pipe(
        filter(
          defaultProfessional =>
            Boolean(defaultProfessional) && !this.servicePublishDataHolderService.isset(ServicePublishSteps.One),
        ),
        map(({ subcategory }) => subcategory),
        switchMap(subcategoryId => this.professionalsApi.professionalsSubcategoriesRead(subcategoryId)),
        switchMap((subcategory: Subcategory) =>
          this.professionalsApi
            .professionalsCategoriesRead(subcategory.category)
            .pipe(map(category => ({ category, subcategory }))),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe(({ category, subcategory }) => {
        this.form.patchValue({ category, subcategory });
      });
  }
}
