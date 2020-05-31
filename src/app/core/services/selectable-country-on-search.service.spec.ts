import { TestBed } from '@angular/core/testing';

import { SelectableCountryOnSearchService } from './selectable-country-on-search.service';

describe('SelectableCountryOnSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectableCountryOnSearchService = TestBed.get(SelectableCountryOnSearchService);
    expect(service).toBeTruthy();
  });
});
