import {TestBed} from '@angular/core/testing';

import {ReviewsReadonlyApiService} from './reviews-readonly-api.service';

describe('ReviewsReadonlyApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviewsReadonlyApiService = TestBed.inject(ReviewsReadonlyApiService);
    expect(service).toBeTruthy();
  });
});
