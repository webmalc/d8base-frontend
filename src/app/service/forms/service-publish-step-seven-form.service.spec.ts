import {TestBed} from '@angular/core/testing';

import {ServicePublishStepSevenFormService} from './service-publish-step-seven-form.service';

describe('ServicePublishStepSevenFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePublishStepSevenFormService = TestBed.inject(ServicePublishStepSevenFormService);
    expect(service).toBeTruthy();
  });
});
