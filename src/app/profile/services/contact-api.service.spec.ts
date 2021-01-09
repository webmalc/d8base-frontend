import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContactApiService } from './contact-api.service';

describe('ContactApiServiceService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ContactApiService],
    }));

    it('should be created', () => {
        const service: ContactApiService = TestBed.inject(ContactApiService);
        expect(service).toBeTruthy();
    });
    xit('should be some tests');
});
