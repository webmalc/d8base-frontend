import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {FcmDevicesApiService} from './fcm-devices-api.service';

describe('FcmDevicesApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            FcmDevicesApiService
        ]
    }));

    it('should be created', () => {
        const service: FcmDevicesApiService = TestBed.inject(FcmDevicesApiService);
        expect(service).toBeTruthy();
    });
});
