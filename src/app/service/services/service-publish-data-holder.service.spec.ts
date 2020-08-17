import {TestBed} from '@angular/core/testing';

import {ServicePublishDataHolderService} from './service-publish-data-holder.service';

describe('ServicePublishDataHolderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePublishDataHolderService = TestBed.get(ServicePublishDataHolderService);
    expect(service).toBeTruthy();
  });
});
