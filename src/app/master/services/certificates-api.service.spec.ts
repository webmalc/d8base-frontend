import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CertificatesApiService } from './certificates-api.service';

describe('CertificatesApiService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CertificatesApiService],
    }),
  );

  it('should be created', () => {
    const service: CertificatesApiService = TestBed.inject(CertificatesApiService);
    expect(service).toBeTruthy();
  });
});
