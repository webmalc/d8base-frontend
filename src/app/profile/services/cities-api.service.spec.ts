import { TestBed } from '@angular/core/testing';

import { CitiesApiService } from './cities-api.service';

describe('CitiesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CitiesApiService = TestBed.get(CitiesApiService);
    expect(service).toBeTruthy();
  });
});
