import { TestBed } from '@angular/core/testing';

import { MasterLocationApiService } from './master-location-api.service';

describe('MasterLocationApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterLocationApiService = TestBed.get(MasterLocationApiService);
    expect(service).toBeTruthy();
  });
});
