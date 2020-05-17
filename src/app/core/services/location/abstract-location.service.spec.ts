import { TestBed } from '@angular/core/testing';

import { AbstractLocationService } from './abstract-location.service';

describe('AbstractLocationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: AbstractLocationService = TestBed.inject(AbstractLocationService);
    expect(service).toBeTruthy();
  });
});
