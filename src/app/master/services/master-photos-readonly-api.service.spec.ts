import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {MasterPhotosReadonlyApiService} from './master-photos-readonly-api.service';

describe('MasterPhotosReadonlyApiService', () => {
    let service: MasterPhotosReadonlyApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(MasterPhotosReadonlyApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
