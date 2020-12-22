import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchFilterStateService } from './search-filter-state.service';

describe('SearchFilterStateService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [SearchFilterStateService]
        })
    );

    it('should be created', () => {
        const service: SearchFilterStateService = TestBed.inject(SearchFilterStateService);
        expect(service).toBeTruthy();
    });
});
