import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SelectableDistrictOnSearchService } from './selectable-district-on-search.service';

describe('SelectableDistrictOnSearchService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [SelectableDistrictOnSearchService],
    }));

    it('should be created', () => {
        const service: SelectableDistrictOnSearchService = TestBed.inject(SelectableDistrictOnSearchService);
        expect(service).toBeTruthy();
    });
});
