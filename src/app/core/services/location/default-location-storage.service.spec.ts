import { TestBed } from '@angular/core/testing';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { StorageManagerMock } from '../../../../testing/mocks';
import { DefaultLocationStorageService } from './default-location-storage.service';

describe('DefaultLocationStorageService', () => {
    let service: DefaultLocationStorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: StorageManagerService, useClass: StorageManagerMock},
            ],
        });
        service = TestBed.inject(DefaultLocationStorageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
