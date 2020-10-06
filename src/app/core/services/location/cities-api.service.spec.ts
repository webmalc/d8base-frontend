import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CitiesApiService} from './cities-api.service';

describe('CitiesApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [CitiesApiService]
    }));

    it('should be created', () => {
        const service: CitiesApiService = TestBed.inject(CitiesApiService);
        expect(service).toBeTruthy();
    });

    xit('should be some tests');
});
