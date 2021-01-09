import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SubcategoriesApiService } from './subcategories-api.service';

describe('SubcategoriesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      SubcategoriesApiService,
    ],
  }));

  it('should be created', () => {
    const service: SubcategoriesApiService = TestBed.inject(SubcategoriesApiService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
