import { Component } from '@angular/core';
import { Category } from '@app/core/models/category';
import { Subcategory } from '@app/core/models/subcategory';
import { CategoriesApiService } from '@app/core/services/categories-api.service';
import { SubcategoriesApiService } from '@app/core/services/subcategories-api.service';
import { TranslationService } from '@app/core/services/translation.service';
import { ServicePublishStepOneFormFields } from '@app/service/enums/service-publish-step-one-form-fields';
import { ServicePublishSteps } from '@app/service/enums/service-publish-steps';
import { ServicePublishStepOneFormService } from '@app/service/forms/service-publish-step-one-form.service';
import { StepOneDataInterface } from '@app/service/interfaces/step-one-data-interface';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import { ServiceStepsNavigationService } from '@app/service/services/service-steps-navigation.service';
import { Reinitable } from '@app/shared/abstract/reinitable';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-service-publish-step-one',
  templateUrl: './service-publish-step-one.component.html',
  styleUrls: ['./service-publish-step-one.component.scss'],
})
export class ServicePublishStepOneComponent extends Reinitable {

  public formFields = ServicePublishStepOneFormFields;
  public categoriesList$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  public subcategoriesList$: BehaviorSubject<Subcategory[]> = new BehaviorSubject<Subcategory[]>([]);

  constructor(
    private readonly categoriesApi: CategoriesApiService,
    private readonly subcategoriesApi: SubcategoriesApiService,
    public formService: ServicePublishStepOneFormService,
    private readonly servicePublishDataHolderService: ServicePublishDataHolderService,
    private readonly serviceStepsNavigationService: ServiceStepsNavigationService,
    public trans: TranslationService,
  ) {
    super();
  }

  public submitForm(): void {
    this.servicePublishDataHolderService.setStepData<StepOneDataInterface>(
      ServicePublishSteps.One,
      {
        category: this.formService.form.get(this.formFields.Category).value,
        subcategory: this.formService.form.get(this.formFields.Subcategory).value,
      },
    );
    this.serviceStepsNavigationService.next();
  }

  public onCategoryChange(): void {
    this.formService.form.get(this.formFields.Subcategory).reset();
    this.subcategoriesApi.get({ category: this.formService.form.get(this.formFields.Category).value.id }).subscribe(
      list => this.subcategoriesList$.next(list.results),
    );
  }

  public isSubmitDisabled(): boolean {
    return this.formService.form.invalid;
  }

  protected init(): void {
    this.categoriesApi.get().subscribe(
      list => this.categoriesList$.next(list.results),
    );

    if (this.servicePublishDataHolderService.isset(ServicePublishSteps.One)) {
      const stepData = this.servicePublishDataHolderService.getStepData<StepOneDataInterface>(ServicePublishSteps.One);
      this.formService.createForm(stepData.category, stepData.subcategory);
    } else {
      this.formService.createForm();
    }
  }
}
