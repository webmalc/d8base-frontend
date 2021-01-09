import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PricesApiService} from './prices-api.service';

describe('PricesApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        providers: [
            PricesApiService,
        ],
    }));

    it('should be created', () => {
        const service: PricesApiService = TestBed.inject(PricesApiService);
        expect(service).toBeTruthy();
    });
});
