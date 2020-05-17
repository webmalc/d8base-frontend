import { TestBed } from '@angular/core/testing';

import { AbstractLocationServiceService } from './abstract-location.service';

describe('AbstractLocationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbstractLocationServiceService = TestBed.get(AbstractLocationServiceService);
    expect(service).toBeTruthy();
  });
});
