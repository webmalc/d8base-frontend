import { TestBed } from '@angular/core/testing';

import { SelectableSubregionOnSearchService } from './selectable-subregion-on-search.service';

describe('SelectableSubregionOnSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectableSubregionOnSearchService = TestBed.get(SelectableSubregionOnSearchService);
    expect(service).toBeTruthy();
  });
});
