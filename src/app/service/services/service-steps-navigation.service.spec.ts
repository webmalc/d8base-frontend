import {TestBed} from '@angular/core/testing';

import {ServiceStepsNavigationService} from './service-steps-navigation.service';

describe('ServiceStepsNavigationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceStepsNavigationService = TestBed.get(ServiceStepsNavigationService);
    expect(service).toBeTruthy();
  });
});
