import {TestBed} from '@angular/core/testing';

import {CertificateApiService} from './certificate-api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CertificationApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [CertificateApiService]
    }));

    it('should be created', () => {
        const service: CertificateApiService = TestBed.inject(CertificateApiService);
        expect(service).toBeTruthy();
    });
    xit('should be some tests');
});
