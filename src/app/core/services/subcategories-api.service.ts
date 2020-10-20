import { Injectable } from '@angular/core';
import {AbstractReadonlyApiService} from '@app/core/abstract/abstract-readonly-api.service';
import {Subcategory} from '@app/core/models/subcategory';
import {ApiClientService} from '@app/core/services/api-client.service';
import {plainToClass} from 'class-transformer';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SubcategoriesApiService extends AbstractReadonlyApiService<Subcategory> {

    private readonly url = environment.backend.subcategory;

    constructor(private readonly client: ApiClientService) {
        super(client);
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: Subcategory | Subcategory[]): Subcategory | Subcategory[] {
        return plainToClass(Subcategory, data);
    }
}
