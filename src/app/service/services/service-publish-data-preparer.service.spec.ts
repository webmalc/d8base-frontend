import {TestBed} from '@angular/core/testing';

import {StorageManagerService} from '../../core/proxies/storage-manager.service';
import {StorageManagerMock} from '../../core/services/token-manager.service.spec';
import {ServicePublishDataHolderService} from './service-publish-data-holder.service';
import {ServicePublishDataPreparerService} from './service-publish-data-preparer.service';

describe('ServicePublishDataPreparerService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            ServicePublishDataPreparerService,
            ServicePublishDataHolderService,
            {provide: StorageManagerService, useClass: StorageManagerMock}
        ]
    }));

    it('should be created', () => {
        const service: ServicePublishDataPreparerService = TestBed.inject(ServicePublishDataPreparerService);
        expect(service).toBeTruthy();
    });
});
