import { TestBed } from '@angular/core/testing';
import { StorageManagerService } from '@app/core/services';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from 'src/testing/mocks';

import { ServicePublishDataHolderService } from './service-publish-data-holder.service';
import { ServiceStepsNavigationService } from './service-steps-navigation.service';
import { ChainManagerService } from './steps-navigation-chain/chain-manager.service';
import { StepFinalHandlerService } from './steps-navigation-chain/step-final-handler.service';
import { StepFiveHandlerService } from './steps-navigation-chain/step-five-handler.service';
import { StepFourHandlerService } from './steps-navigation-chain/step-four-handler.service';
import { StepOneHandlerService } from './steps-navigation-chain/step-one-handler.service';
import { StepSevenHandlerService } from './steps-navigation-chain/step-seven-handler.service';
import { StepSixHandlerService } from './steps-navigation-chain/step-six-handler.service';
import { StepThreeHandlerService } from './steps-navigation-chain/step-three-handler.service';
import { StepTwoHandlerService } from './steps-navigation-chain/step-two-handler.service';

describe('ServiceStepsNavigationService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [...RootModules(), ComponentTestingModule],
      providers: [
        ServiceStepsNavigationService,
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
        { provide: StorageManagerService, useClass: StorageManagerMock },
      ],
    }),
  );

  it('should be created', () => {
    const service: ServiceStepsNavigationService = TestBed.inject(ServiceStepsNavigationService);
    expect(service).toBeTruthy();
  });
});
