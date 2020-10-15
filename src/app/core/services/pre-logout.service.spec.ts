import {TestBed} from '@angular/core/testing';

import {PreLogoutService} from './pre-logout.service';

describe('PreLogoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreLogoutService = TestBed.inject(PreLogoutService);
    expect(service).toBeTruthy();
  });
});
