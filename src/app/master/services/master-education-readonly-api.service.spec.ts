import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {MasterEducationReadonlyApiService} from './master-education-readonly-api.service';

describe('MasterEducationReadonlyApiService', () => {
    let service: MasterEducationReadonlyApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(MasterEducationReadonlyApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
