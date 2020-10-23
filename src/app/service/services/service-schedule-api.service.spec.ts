import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ServiceScheduleApiService} from './service-schedule-api.service';

describe('ServiceScheduleApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            ServiceScheduleApiService
        ]
    }));

    it('should be created', () => {
        const service: ServiceScheduleApiService = TestBed.inject(ServiceScheduleApiService);
        expect(service).toBeTruthy();
    });
});
