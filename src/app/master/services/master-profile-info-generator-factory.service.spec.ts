import {TestBed} from '@angular/core/testing';

import {MasterProfileInfoGeneratorFactoryService} from './master-profile-info-generator-factory.service';

describe('MasterProfileInfoGeneratorFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterProfileInfoGeneratorFactoryService = TestBed.inject(MasterProfileInfoGeneratorFactoryService);
    expect(service).toBeTruthy();
  });
});
