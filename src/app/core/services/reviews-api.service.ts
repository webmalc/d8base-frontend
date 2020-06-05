import { Injectable } from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiServiceInterface} from '@app/core/interfaces/api-service-interface';
import {Review} from '@app/core/models/review';
import {ApiClientService} from '@app/core/services/api-client.service';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReviewsApiService implements Partial<ApiServiceInterface<Review>> {

    private readonly URL = environment.backend.reviews;

    constructor(private client: ApiClientService) { }

    public get(masterId?: number): Observable<ApiListResponseInterface<Review>> {
        return this.client.get(this.URL).pipe(
            map((raw: ApiListResponseInterface<Review>) => {
                raw.results = plainToClass(Review, raw.results);

                return raw;
            })
        );
    }
}
