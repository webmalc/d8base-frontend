import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {StorageManagerMock} from 'src/testing/mocks';
import {StorageManagerService} from '../proxies/storage-manager.service';
import {MasterGuard} from './master.guard';

describe('MasterGuard', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        providers: [
            MasterGuard,
            {provide: StorageManagerService, useClass: StorageManagerMock},
        ],
    }));

    it('should be created', () => {
        const service: MasterGuard = TestBed.inject(MasterGuard);
        expect(service).toBeTruthy();
    });

    xit('should be some tests');
});
