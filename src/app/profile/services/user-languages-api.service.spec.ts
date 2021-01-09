import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserLanguagesApiService} from './user-languages-api.service';

describe('UserLanguagesApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        providers: [
            UserLanguagesApiService,
        ],
    }));

    it('should be created', () => {
        const service: UserLanguagesApiService = TestBed.inject(UserLanguagesApiService);
        expect(service).toBeTruthy();
    });
});
