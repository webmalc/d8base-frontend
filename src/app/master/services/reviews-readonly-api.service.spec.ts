import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReviewsReadonlyApiService} from './reviews-readonly-api.service';

describe('ReviewsReadonlyApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        providers: [
            ReviewsReadonlyApiService,
        ],
    }));

    it('should be created', () => {
        const service: ReviewsReadonlyApiService = TestBed.inject(ReviewsReadonlyApiService);
        expect(service).toBeTruthy();
    });
});
