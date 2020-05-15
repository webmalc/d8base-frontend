import { TestBed } from '@angular/core/testing';

import { LocationFormService } from './location-form.service';

describe('LocationFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationFormService = TestBed.get(LocationFormService);
    expect(service).toBeTruthy();
  });
});
