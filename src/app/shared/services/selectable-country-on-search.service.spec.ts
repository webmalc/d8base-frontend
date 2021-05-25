import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SelectableCountryOnSearchService } from './selectable-country-on-search.service';

describe('SelectableCountryOnSearchService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SelectableCountryOnSearchService],
    }),
  );

  it('should be created', () => {
    const service: SelectableCountryOnSearchService = TestBed.inject(SelectableCountryOnSearchService);
    expect(service).toBeTruthy();
  });
});
