import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SelectablePostalCodeOnSearchService} from './selectable-postal-code-on-search.service';

describe('SelectablePostalCodeOnSearchService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            SelectablePostalCodeOnSearchService
        ]
    }));

    it('should be created', () => {
        const service: SelectablePostalCodeOnSearchService = TestBed.inject(SelectablePostalCodeOnSearchService);
        expect(service).toBeTruthy();
    });
});
