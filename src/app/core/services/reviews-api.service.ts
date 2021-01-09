import { Injectable } from '@angular/core';
import { AbstractApiService } from '@app/core/abstract/abstract-api.service';
import { ApiServiceInterface } from '@app/core/interfaces/api-service-interface';
import { Review } from '@app/core/models/review';
import { ApiClientService } from '@app/core/services/api-client.service';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';

@Injectable({
    providedIn: 'root',
})
export class ReviewsApiService extends AbstractApiService<Review> implements ApiServiceInterface<Review> {

    private readonly URL = environment.backend.reviews;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    protected getUrl(): string {
        return this.URL;
    }

    // @ts-ignore
    protected transform(data: Review[] | Review): Review[] | Review {
        return plainToClass(Review, data);
    }
}
