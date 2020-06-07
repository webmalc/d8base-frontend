import { Injectable } from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiServiceInterface} from '@app/core/interfaces/api-service-interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Subcategory} from '@app/master/models/subcategory';
import {plainToClass} from 'class-transformer';
import {environment} from '../../../environments/environment';

@Injectable()
export class SubcategoriesApiService extends AbstractApiService<Subcategory> implements ApiServiceInterface<Subcategory> {

    private readonly url = environment.backend.subcategory;

    constructor(private client: ApiClientService) {
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
