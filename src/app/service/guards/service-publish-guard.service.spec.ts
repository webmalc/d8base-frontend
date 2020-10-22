import {TestBed} from '@angular/core/testing';

import {RouterTestingModule} from '@angular/router/testing';
import {StorageManagerMock} from 'src/testing/mocks';
import {StorageManagerService} from '../../core/proxies/storage-manager.service';
import {ServicePublishDataHolderService} from '../services/service-publish-data-holder.service';
import {ServicePublishGuardService} from './service-publish-guard.service';

describe('ServicePublishGuardService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            RouterTestingModule
        ],
        providers: [
            ServicePublishGuardService,
            ServicePublishDataHolderService,
            {provide: StorageManagerService, useClass: StorageManagerMock}
        ]
    }));

    it('should be created', () => {
        const service: ServicePublishGuardService = TestBed.inject(ServicePublishGuardService);
        expect(service).toBeTruthy();
    });
});
