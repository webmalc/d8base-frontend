import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {FcmDeviceDisableService} from './fcm-device-disable.service';

describe('FcmDeviceDisableService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            FcmDeviceDisableService
        ]
    }));

    it('should be created', () => {
        const service: FcmDeviceDisableService = TestBed.inject(FcmDeviceDisableService);
        expect(service).toBeTruthy();
    });
});
