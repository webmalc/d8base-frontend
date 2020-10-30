import {TestBed} from '@angular/core/testing';
import {SearchFilterStateService} from './search-filter-state.service';

describe('SearchFilterStateService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            SearchFilterStateService
        ]
    }));

    it('should be created', () => {
        const service: SearchFilterStateService = TestBed.inject(SearchFilterStateService);
        expect(service).toBeTruthy();
    });
});
