import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {StorageManagerMock} from 'src/testing/mocks';
import {StorageManagerService} from '../proxies/storage-manager.service';
import {FcmDeviceService} from './fcm-device.service';

describe('FcmDeviceService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        providers: [
            FcmDeviceService,
            {provide: StorageManagerService, useClass: StorageManagerMock},
        ],
    }));

    it('should be created', () => {
        const service: FcmDeviceService = TestBed.inject(FcmDeviceService);
        expect(service).toBeTruthy();
    });
});
