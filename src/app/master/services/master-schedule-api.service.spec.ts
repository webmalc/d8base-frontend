import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {MasterScheduleApiService} from './master-schedule-api.service';

describe('MasterScheduleApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        declarations: [
            MasterScheduleApiService
        ]
    }));

    it('should be created', () => {
        const service: MasterScheduleApiService = TestBed.get(MasterScheduleApiService);
        expect(service).toBeTruthy();
    });
});
