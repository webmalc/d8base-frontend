import { Injectable } from '@angular/core';
import { AbstractReadonlyApiService } from '@app/core/abstract/abstract-readonly-api.service';
import { Category } from '@app/core/models/category';
import { Subcategory } from '@app/core/models/subcategory';
import { ApiClientService } from '@app/core/services/api-client.service';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SubcategoriesApiService extends AbstractReadonlyApiService<Subcategory> {

    private readonly url = environment.backend.subcategory;

    constructor(protected readonly client: ApiClientService) {
        super(client);
    }

    public getListByCategoryId(categories: Category[]): Observable<Subcategory[]> {
        return forkJoin(categories.map(c => super.get({ category: c.id.toString(10)}))).pipe(
            map(data => data.map(r => r.results)),
            map((res: Subcategory[][]) => [].concat(...res)),
        );
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: Subcategory | Subcategory[]): Subcategory | Subcategory[] {
        return plainToClass(Subcategory, data);
    }
}
