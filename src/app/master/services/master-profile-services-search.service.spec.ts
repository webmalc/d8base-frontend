import {TestBed} from '@angular/core/testing';

import {MasterProfileServicesSearchService} from './master-profile-services-search.service';

describe('MasterProfileServicesSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterProfileServicesSearchService = TestBed.get(MasterProfileServicesSearchService);
    expect(service).toBeTruthy();
  });
});
