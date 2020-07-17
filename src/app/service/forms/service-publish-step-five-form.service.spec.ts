import { TestBed } from '@angular/core/testing';

import { ServicePublishStepFiveFormService } from './service-publish-step-five-form.service';

describe('ServicePublishStepFiveFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePublishStepFiveFormService = TestBed.get(ServicePublishStepFiveFormService);
    expect(service).toBeTruthy();
  });
});
