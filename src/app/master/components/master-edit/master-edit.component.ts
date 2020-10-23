import {Component, OnInit} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {Master} from '@app/core/models/master';
import {Subcategory} from '@app/core/models/subcategory';
import {SubcategoriesApiService} from '@app/core/services/subcategories-api.service';
import {EditMasterFormFields} from '@app/master/enums/edit-master-form-fields';
import {AbstractEditComponent} from '@app/shared/abstract/abstract-edit-component';
import {plainToClass} from 'class-transformer';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-master-edit',
    templateUrl: './master-edit.component.html',
    styleUrls: ['./master-edit.component.scss']
})
export class MasterEditComponent extends AbstractEditComponent<Master> implements OnInit {

    public formFields = EditMasterFormFields;
    public subcategoriesList$: BehaviorSubject<Subcategory[]> = new BehaviorSubject<Subcategory[]>([]);
    public levelOptions = ['junior', 'middle', 'senior'];

    constructor(
        private readonly subcategoriesApi: SubcategoriesApiService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initSubcategoriesList().subscribe();
    }

    protected transform(data: Master): Master {
        return plainToClass(Master, data);
    }

    private initSubcategoriesList(): Observable<any> {
        return this.subcategoriesApi.get().pipe(
            tap((data: ApiListResponseInterface<Subcategory>) => this.subcategoriesList$.next(data.results))
        );
    }
}
