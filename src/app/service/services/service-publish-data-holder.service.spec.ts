import {TestBed} from '@angular/core/testing';

import {StorageManagerService} from '../../core/proxies/storage-manager.service';
import {StorageManagerMock} from '../../core/services/token-manager.service.spec';
import {ServicePublishDataHolderService} from './service-publish-data-holder.service';

describe('ServicePublishDataHolderService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            ServicePublishDataHolderService,
            {provide: StorageManagerService, useClass: StorageManagerMock}
        ]
    }));

    it('should be created', () => {
        const service: ServicePublishDataHolderService = TestBed.inject(ServicePublishDataHolderService);
        expect(service).toBeTruthy();
    });
});
