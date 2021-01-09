import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RegisterEmailApiService} from './register-email-api.service';

describe('RegisterEmailApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            RegisterEmailApiService,
        ],
    }));

    it('should be created', () => {
        const service: RegisterEmailApiService = TestBed.inject(RegisterEmailApiService);
        expect(service).toBeTruthy();
    });
});
