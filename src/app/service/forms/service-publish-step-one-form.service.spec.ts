import { TestBed } from '@angular/core/testing';

import { ServicePublishStepOneFormService } from './service-publish-step-one-form.service';

describe('ServicePublishStepOneFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePublishStepOneFormService = TestBed.get(ServicePublishStepOneFormService);
    expect(service).toBeTruthy();
  });
});
