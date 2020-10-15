import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {IsUserRegisteredApiService} from './is-user-registered-api.service';

describe('IsUserRegisteredApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            HttpClientTestingModule
        ]
    }));

    it('should be created', () => {
        const service: IsUserRegisteredApiService = TestBed.inject(IsUserRegisteredApiService);
        expect(service).toBeTruthy();
    });
});
