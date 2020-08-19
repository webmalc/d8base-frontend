import {TestBed} from '@angular/core/testing';

import {ServicePublishDataPreparerService} from './service-publish-data-preparer.service';

describe('ServicePublishDataPreparerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePublishDataPreparerService = TestBed.get(ServicePublishDataPreparerService);
    expect(service).toBeTruthy();
  });
});
