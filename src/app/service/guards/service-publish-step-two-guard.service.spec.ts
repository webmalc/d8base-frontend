import { TestBed } from '@angular/core/testing';

import { ServicePublishStepTwoGuardService } from './service-publish-step-two-guard.service';

describe('ServicePublishStepTwoGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePublishStepTwoGuardService = TestBed.get(ServicePublishStepTwoGuardService);
    expect(service).toBeTruthy();
  });
});
