import {TestBed} from '@angular/core/testing';

import {UserContactApiService} from './user-contact-api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UserContactApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            UserContactApiService
        ]
    }));

    it('should be created', () => {
        const service: UserContactApiService = TestBed.inject(UserContactApiService);
        expect(service).toBeTruthy();
    });

    xit('should be some tests');
});
