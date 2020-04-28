import { Injectable } from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Subcategory} from '@app/master/models/subcategory';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class SubcategoriesApiService {

    private readonly url = environment.backend.subcategory;

    constructor(private client: ApiClientService) { }

    public getList(): Observable<ApiListResponseInterface<Subcategory>> {
        return this.client.get<ApiListResponseInterface<Subcategory>>(this.url).pipe(
            map((result: ApiListResponseInterface<Subcategory>) => {
                result.results = plainToClass(Subcategory, result.results);

                return result;
            })
        );
    }
}
