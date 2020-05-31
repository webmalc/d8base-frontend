import { TestBed } from '@angular/core/testing';

import { SelectableDistrictOnSearchService } from './selectable-district-on-search.service';

describe('SelectableDistrictOnSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectableDistrictOnSearchService = TestBed.get(SelectableDistrictOnSearchService);
    expect(service).toBeTruthy();
  });
});
