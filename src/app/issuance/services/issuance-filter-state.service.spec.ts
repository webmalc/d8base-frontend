import {TestBed} from '@angular/core/testing';

import {IssuanceFilterStateService} from './issuance-filter-state.service';

describe('IssuanceFilterStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IssuanceFilterStateService = TestBed.get(IssuanceFilterStateService);
    expect(service).toBeTruthy();
  });
});
