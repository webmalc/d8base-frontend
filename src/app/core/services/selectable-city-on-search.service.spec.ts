import { TestBed } from '@angular/core/testing';

import { SelectableCityOnSearchService } from './selectable-city-on-search.service';

describe('SelectableCityOnSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectableCityOnSearchService = TestBed.get(SelectableCityOnSearchService);
    expect(service).toBeTruthy();
  });
});
