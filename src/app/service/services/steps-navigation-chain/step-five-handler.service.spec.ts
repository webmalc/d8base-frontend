import {TestBed} from '@angular/core/testing';

import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {StorageManagerMock} from '../../../core/services/token-manager.service.spec';
import {ServicePublishDataHolderService} from '../service-publish-data-holder.service';
import {StepFiveHandlerService} from './step-five-handler.service';

describe('StepFiveHandlerService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            StepFiveHandlerService,
            ServicePublishDataHolderService,
            {provide: StorageManagerService, useClass: StorageManagerMock}
        ]
    }));

    it('should be created', () => {
        const service: StepFiveHandlerService = TestBed.inject(StepFiveHandlerService);
        expect(service).toBeTruthy();
    });
});
