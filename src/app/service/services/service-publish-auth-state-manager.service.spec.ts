import {TestBed} from '@angular/core/testing';

import {ServicePublishAuthStateManagerService} from './service-publish-auth-state-manager.service';

describe('ServicePublishAuthStateManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePublishAuthStateManagerService = TestBed.get(ServicePublishAuthStateManagerService);
    expect(service).toBeTruthy();
  });
});
