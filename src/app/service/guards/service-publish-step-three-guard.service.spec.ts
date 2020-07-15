import { TestBed } from '@angular/core/testing';

import { ServicePublishStepThreeGuardService } from './service-publish-step-three-guard.service';

describe('ServicePublishStepThreeGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePublishStepThreeGuardService = TestBed.get(ServicePublishStepThreeGuardService);
    expect(service).toBeTruthy();
  });
});
