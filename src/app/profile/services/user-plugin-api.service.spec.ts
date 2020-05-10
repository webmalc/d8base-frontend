import {TestBed} from '@angular/core/testing';

import {UserPluginApiService} from './user-plugin-api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UserPluginApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [UserPluginApiService]
    }));

    it('should be created', () => {
        const service: UserPluginApiService = TestBed.inject(UserPluginApiService);
        expect(service).toBeTruthy();
    });

    xit('should be some tests');
});
