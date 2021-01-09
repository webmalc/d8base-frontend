import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SelectableCityOnSearchService} from './selectable-city-on-search.service';

describe('SelectableCityOnSearchService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [SelectableCityOnSearchService],
    }));

    it('should be created', () => {
        const service: SelectableCityOnSearchService = TestBed.inject(SelectableCityOnSearchService);
        expect(service).toBeTruthy();
    });
});
