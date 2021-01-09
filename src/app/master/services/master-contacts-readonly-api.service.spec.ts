import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {MasterContactsReadonlyApiService} from './master-contacts-readonly-api.service';

describe('MasterContactsReadonlyApiService', () => {
    let service: MasterContactsReadonlyApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(MasterContactsReadonlyApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
