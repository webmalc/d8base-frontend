import { TestBed } from '@angular/core/testing';

import { ServicePublishService } from './service-publish.service';

describe('ServicePublishService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePublishService = TestBed.get(ServicePublishService);
    expect(service).toBeTruthy();
  });
});
