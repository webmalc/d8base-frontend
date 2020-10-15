import {TestBed} from '@angular/core/testing';

import {ServicesGeneratorFactoryService} from './services-generator-factory.service';

describe('ServicesGeneratorFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicesGeneratorFactoryService = TestBed.inject(ServicesGeneratorFactoryService);
    expect(service).toBeTruthy();
  });
});
