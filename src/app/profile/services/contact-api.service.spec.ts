import {TestBed} from '@angular/core/testing';

import {ContactApiService} from './contact-api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ContactApiServiceService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ContactApiService]
    }));

    it('should be created', () => {
        const service: ContactApiService = TestBed.inject(ContactApiService);
        expect(service).toBeTruthy();
    });
    xit('should be some tests');
});
