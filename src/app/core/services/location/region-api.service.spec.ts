import { TestBed } from '@angular/core/testing';

import { RegionApiService } from './region-api.service';

describe('RegionApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegionApiService = TestBed.get(RegionApiService);
    expect(service).toBeTruthy();
  });
});
