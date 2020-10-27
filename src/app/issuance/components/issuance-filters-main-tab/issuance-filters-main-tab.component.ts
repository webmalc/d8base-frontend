import {Component} from '@angular/core';
import {Category} from '@app/core/models/category';
import {Subcategory} from '@app/core/models/subcategory';
import {CategoriesApiService} from '@app/core/services/categories-api.service';
import {SubcategoriesApiService} from '@app/core/services/subcategories-api.service';
import {IssuanceFilterStateService} from '@app/issuance/services/issuance-filter-state.service';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-issuance-filters-main-tab',
    templateUrl: './issuance-filters-main-tab.component.html',
    styleUrls: ['./issuance-filters-main-tab.component.scss']
})
export class IssuanceFiltersMainTabComponent {

    public categoryList$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
    public subcategoriesList$: BehaviorSubject<Subcategory[]> = new BehaviorSubject<Subcategory[]>([]);

    constructor(
        private readonly subcategoriesApi: SubcategoriesApiService,
        private readonly categoriesApi: CategoriesApiService,
        public readonly stateManager: IssuanceFilterStateService
    ) {
    }

    public init(): void {
        this.categoriesApi.get().subscribe(
            results => this.categoryList$.next(results.results)
        );
    }

    public initSubcategories(cat: Category[]): void {
        this.subcategoriesApi.getListByCategoryId(cat).subscribe(
            data => this.subcategoriesList$.next(data)
        );
    }
}
