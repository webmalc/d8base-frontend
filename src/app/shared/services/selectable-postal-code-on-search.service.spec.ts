import {TestBed} from '@angular/core/testing';

import {SelectablePostalCodeOnSearchService} from './selectable-postal-code-on-search.service';

describe('SelectablePostalCodeOnSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectablePostalCodeOnSearchService = TestBed.get(SelectablePostalCodeOnSearchService);
    expect(service).toBeTruthy();
  });
});
