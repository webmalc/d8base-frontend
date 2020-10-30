import {Component} from '@angular/core';
import {Category} from '@app/core/models/category';
import {Subcategory} from '@app/core/models/subcategory';
import {CategoriesApiService} from '@app/core/services/categories-api.service';
import {SubcategoriesApiService} from '@app/core/services/subcategories-api.service';
import {SearchFilterStateService} from '@app/search/services/search-filter-state.service';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-search-filters-main-tab',
    templateUrl: './search-filters-main-tab.component.html',
    styleUrls: ['./search-filters-main-tab.component.scss']
})
export class SearchFiltersMainTabComponent {

    public categoryList$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
    public subcategoriesList$: BehaviorSubject<Subcategory[]> = new BehaviorSubject<Subcategory[]>([]);

    constructor(
        private readonly subcategoriesApi: SubcategoriesApiService,
        private readonly categoriesApi: CategoriesApiService,
        public readonly stateManager: SearchFilterStateService
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
