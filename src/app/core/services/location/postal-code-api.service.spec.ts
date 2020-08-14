import {TestBed} from '@angular/core/testing';

import {PostalCodeApiService} from './postal-code-api.service';

describe('PostalCodeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostalCodeApiService = TestBed.get(PostalCodeApiService);
    expect(service).toBeTruthy();
  });
});
