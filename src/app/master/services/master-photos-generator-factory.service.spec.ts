import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StorageManagerMock } from 'src/testing/mocks';
import { StorageManagerService } from '../../core/proxies/storage-manager.service';
import { MasterPhotosGeneratorFactoryService } from './master-photos-generator-factory.service';

describe('MasterPhotosGeneratorService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        providers: [
            MasterPhotosGeneratorFactoryService,
            { provide: StorageManagerService, useClass: StorageManagerMock},
        ],
    }));

    it('should be created', () => {
        const service: MasterPhotosGeneratorFactoryService = TestBed.inject(MasterPhotosGeneratorFactoryService);
        expect(service).toBeTruthy();
    });
});
