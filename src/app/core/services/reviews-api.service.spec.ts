import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import { ReviewsApiService } from './reviews-api.service';

describe('ReviewsApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ReviewsApiService]
    }));

    it('should be created', () => {
        const service: ReviewsApiService = TestBed.get(ReviewsApiService);
        expect(service).toBeTruthy();
    });
});
