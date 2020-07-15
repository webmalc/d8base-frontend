import { TestBed } from '@angular/core/testing';

import { ServicePublishStepTwoFormService } from './service-publish-step-two-form.service';

describe('ServicePublishStepTwoFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePublishStepTwoFormService = TestBed.get(ServicePublishStepTwoFormService);
    expect(service).toBeTruthy();
  });
});
