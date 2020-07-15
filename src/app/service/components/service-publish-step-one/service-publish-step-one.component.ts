import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Category} from '@app/core/models/category';
import {Subcategory} from '@app/core/models/subcategory';
import {CategoriesApiService} from '@app/core/services/categories-api.service';
import {SubcategoriesApiService} from '@app/core/services/subcategories-api.service';
import {TranslationService} from '@app/core/services/translation.service';
import {ServicePublishStepOneFormFields} from '@app/service/enums/service-publish-step-one-form-fields';
import {ServicePublishStepOneFormService} from '@app/service/forms/service-publish-step-one-form.service';
import {ServicePublishService} from '@app/service/services/service-publish.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-service-publish-step-one',
    templateUrl: './service-publish-step-one.component.html',
    styleUrls: ['./service-publish-step-one.component.scss'],
})
export class ServicePublishStepOneComponent extends Reinitable implements OnInit {

    public formFields = ServicePublishStepOneFormFields;
    public categoriesList$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
    public subcategoriesList$: BehaviorSubject<Subcategory[]> = new BehaviorSubject<Subcategory[]>([]);
    private readonly STEP = 0;

    constructor(
        private categoriesApi: CategoriesApiService,
        private subcategoriesApi: SubcategoriesApiService,
        public readonly formService: ServicePublishStepOneFormService,
        public servicePublishService: ServicePublishService,
        private router: Router,
        public trans: TranslationService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.categoriesApi.get().subscribe(
            list => this.categoriesList$.next(list.results)
        );

        if (this.servicePublishService.isset(this.STEP)) {
            const stepData = this.servicePublishService.getStepData<{ category: Category, subcategory: Subcategory }>(this.STEP);
            this.formService.fillForm(stepData.category, stepData.subcategory);
        } else {
            this.formService.createForm();
        }
    }

    public submitForm(): void {
        console.log(this.formService.form.getRawValue());
        this.servicePublishService.setStepData(
            this.STEP,
            {
                category: this.formService.form.get(this.formFields.Category).value,
                subcategory: this.formService.form.get(this.formFields.Subcategory).value
            }
        );
        this.router.navigateByUrl('/service/publish/step-two');
    }

    public onCategoryChange(): void {
        this.formService.form.get(this.formFields.Subcategory).reset();
        this.subcategoriesApi.get({category: this.formService.form.get(this.formFields.Category).value.id}).subscribe(
            list => this.subcategoriesList$.next(list.results)
        );
    }

}
