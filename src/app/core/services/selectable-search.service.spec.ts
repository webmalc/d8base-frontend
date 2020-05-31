import { TestBed } from '@angular/core/testing';

import { SelectableSearchService } from './selectable-search.service';

describe('SelectableSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectableSearchService = TestBed.get(SelectableSearchService);
    expect(service).toBeTruthy();
  });
});
