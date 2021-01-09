import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {MasterCertificatesReadonlyApiService} from './master-certificates-readonly-api.service';

describe('MasterCertificatesReadonlyApiService', () => {
    let service: MasterCertificatesReadonlyApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(MasterCertificatesReadonlyApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
