import {TestBed} from '@angular/core/testing';

import {UserSettingsApiService} from './user-settings-api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UserSettingsApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            UserSettingsApiService
        ]
    }));

    it('should be created', () => {
        const service: UserSettingsApiService = TestBed.inject(UserSettingsApiService);
        expect(service).toBeTruthy();
    });

    xit('should be some tests');
});
