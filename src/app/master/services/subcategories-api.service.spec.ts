import { TestBed } from '@angular/core/testing';

import { SubcategoriesApiService } from './subcategories-api.service';

describe('SubcategoriesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubcategoriesApiService = TestBed.get(SubcategoriesApiService);
    expect(service).toBeTruthy();
  });
});
