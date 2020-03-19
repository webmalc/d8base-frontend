import { TestBed } from '@angular/core/testing';

import { CertificateApiService } from './certificate-api.service';

describe('CertificationApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CertificateApiService = TestBed.get(CertificateApiService);
    expect(service).toBeTruthy();
  });
});
