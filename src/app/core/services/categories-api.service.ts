import { Injectable } from '@angular/core';
import { AbstractReadonlyApiService } from '@app/core/abstract/abstract-readonly-api.service';
import { Category } from '@app/core/models/category';
import { ApiClientService } from '@app/core/services/api-client.service';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';

@Injectable({
    providedIn: 'root',
})
export class CategoriesApiService extends AbstractReadonlyApiService<Category> {

    private readonly url = environment.backend.category;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: Category | Category[]): Category | Category[] {
        return plainToClass(Category, data);
    }
}
