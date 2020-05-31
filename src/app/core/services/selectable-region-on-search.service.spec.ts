import { TestBed } from '@angular/core/testing';

import { SelectableRegionOnSearchService } from './selectable-region-on-search.service';

describe('SelectableRegionOnSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectableRegionOnSearchService = TestBed.get(SelectableRegionOnSearchService);
    expect(service).toBeTruthy();
  });
});
