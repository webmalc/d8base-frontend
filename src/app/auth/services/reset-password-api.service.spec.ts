import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ResetPasswordApiService} from './reset-password-api.service';

describe('ResetPasswordApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            ResetPasswordApiService
        ]
    }));

    it('should be created', () => {
        const service: ResetPasswordApiService = TestBed.inject(ResetPasswordApiService);
        expect(service).toBeTruthy();
    });

    xit('should be some tests');
});
