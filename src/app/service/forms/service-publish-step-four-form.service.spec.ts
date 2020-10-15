import {TestBed} from '@angular/core/testing';

import {ServicePublishStepFourFormService} from './service-publish-step-four-form.service';

describe('ServicePublishStepFourFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePublishStepFourFormService = TestBed.inject(ServicePublishStepFourFormService);
    expect(service).toBeTruthy();
  });
});
