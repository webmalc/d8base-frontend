import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SelectableRegionOnSearchService } from './selectable-region-on-search.service';

describe('SelectableRegionOnSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [SelectableRegionOnSearchService],
  }));

  it('should be created', () => {
    const service: SelectableRegionOnSearchService = TestBed.inject(SelectableRegionOnSearchService);
    expect(service).toBeTruthy();
  });
});
