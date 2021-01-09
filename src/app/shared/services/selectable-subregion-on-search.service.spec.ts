import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SelectableSubregionOnSearchService } from './selectable-subregion-on-search.service';

describe('SelectableSubregionOnSearchService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        providers: [
            SelectableSubregionOnSearchService,
        ],
    }));

    it('should be created', () => {
        const service: SelectableSubregionOnSearchService = TestBed.inject(SelectableSubregionOnSearchService);
        expect(service).toBeTruthy();
    });
});
