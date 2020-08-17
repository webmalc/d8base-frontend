import { TestBed } from '@angular/core/testing';

import { ServicePublishStepSevenDepartureFormService } from './service-publish-step-seven-departure-form.service';

describe('ServicePublishStepSevenDepartureFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePublishStepSevenDepartureFormService = TestBed.get(ServicePublishStepSevenDepartureFormService);
    expect(service).toBeTruthy();
  });
});
