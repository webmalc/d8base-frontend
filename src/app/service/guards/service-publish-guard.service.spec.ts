import {TestBed} from '@angular/core/testing';

import {ServicePublishGuardService} from './service-publish-guard.service';

describe('ServicePublishGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePublishGuardService = TestBed.get(ServicePublishGuardService);
    expect(service).toBeTruthy();
  });
});
