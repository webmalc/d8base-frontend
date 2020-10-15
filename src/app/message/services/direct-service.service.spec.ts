import {TestBed} from '@angular/core/testing';

import {DirectServiceService} from './direct-service.service';

describe('DirectServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DirectServiceService = TestBed.inject(DirectServiceService);
    expect(service).toBeTruthy();
  });
});
