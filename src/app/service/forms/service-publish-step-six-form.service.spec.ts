import { TestBed } from '@angular/core/testing';

import { ServicePublishStepSixFormService } from './service-publish-step-six-form.service';

describe('ServicePublishStepSixFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePublishStepSixFormService = TestBed.get(ServicePublishStepSixFormService);
    expect(service).toBeTruthy();
  });
});
