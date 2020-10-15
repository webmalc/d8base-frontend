import {TestBed} from '@angular/core/testing';

import {PostalCodeApiService} from './postal-code-api.service';

describe('PostalCodeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostalCodeApiService = TestBed.inject(PostalCodeApiService);
    expect(service).toBeTruthy();
  });
});
