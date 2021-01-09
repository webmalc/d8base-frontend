import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {StorageManagerMock} from '../../../../testing/mocks';
import {NominatimService} from './nominatim.service';

describe('NominatimService', () => {
    let service: NominatimService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                {provide: StorageManagerService, useClass: StorageManagerMock},
            ],
        });
        service = TestBed.inject(NominatimService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
