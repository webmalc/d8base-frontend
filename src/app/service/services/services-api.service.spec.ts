import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ServicesApiService} from './services-api.service';

describe('ServicesApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        providers: [
            ServicesApiService,
        ],
    }));

    it('should be created', () => {
        const service: ServicesApiService = TestBed.inject(ServicesApiService);
        expect(service).toBeTruthy();
    });
});
