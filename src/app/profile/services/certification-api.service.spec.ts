import { TestBed } from '@angular/core/testing';

import { CertificationApiService } from './certification-api.service';

describe('CertificationApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CertificationApiService = TestBed.get(CertificationApiService);
    expect(service).toBeTruthy();
  });
});
