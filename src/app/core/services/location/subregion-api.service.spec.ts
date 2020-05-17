import { TestBed } from '@angular/core/testing';

import { SubregionApiService } from './subregion-api.service';

describe('SubregionApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubregionApiService = TestBed.get(SubregionApiService);
    expect(service).toBeTruthy();
  });
});
