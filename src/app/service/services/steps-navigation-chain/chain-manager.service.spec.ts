import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {StorageManagerMock} from '../../../core/services/token-manager.service.spec';
import {ServicePublishDataHolderService} from '../service-publish-data-holder.service';
import {ChainManagerService} from './chain-manager.service';
import {StepFinalHandlerService} from './step-final-handler.service';
import {StepFiveHandlerService} from './step-five-handler.service';
import {StepFourHandlerService} from './step-four-handler.service';
import {StepOneHandlerService} from './step-one-handler.service';
import {StepSevenHandlerService} from './step-seven-handler.service';
import {StepSixHandlerService} from './step-six-handler.service';
import {StepThreeHandlerService} from './step-three-handler.service';
import {StepTwoHandlerService} from './step-two-handler.service';

describe('ChainManagerService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            ChainManagerService,
            StepOneHandlerService,
            StepTwoHandlerService,
            StepThreeHandlerService,
            StepFourHandlerService,
            StepFiveHandlerService,
            StepSixHandlerService,
            StepSevenHandlerService,
            StepFinalHandlerService,
            ServicePublishDataHolderService,
            AuthenticationService,
            {provide: StorageManagerService, useClass: StorageManagerMock}
        ]
    }));

    it('should be created', () => {
        const service: ChainManagerService = TestBed.inject(ChainManagerService);
        expect(service).toBeTruthy();
    });
});
