import {TestBed} from '@angular/core/testing';

import {CategoriesApiService} from './categories-api.service';

describe('CategoriesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriesApiService = TestBed.inject(CategoriesApiService);
    expect(service).toBeTruthy();
  });
});
