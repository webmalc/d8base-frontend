import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MasterLocationsReadonlyApiService } from './master-locations-readonly-api.service';

describe('MasterLocationsReadonlyApiService', () => {
    let service: MasterLocationsReadonlyApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(MasterLocationsReadonlyApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
