import { TestBed } from '@angular/core/testing';
import { AuthenticationService, StorageManagerService } from '@app/core/services';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from 'src/testing/mocks';

import { ServicePublishDataHolderService } from '../service-publish-data-holder.service';
import { ChainManagerService } from './chain-manager.service';
import { StepFinalHandlerService } from './step-final-handler.service';
import { StepFiveHandlerService } from './step-five-handler.service';
import { StepFourHandlerService } from './step-four-handler.service';
import { StepOneHandlerService } from './step-one-handler.service';
import { StepSevenHandlerService } from './step-seven-handler.service';
import { StepSixHandlerService } from './step-six-handler.service';
import { StepThreeHandlerService } from './step-three-handler.service';
import { StepTwoHandlerService } from './step-two-handler.service';

describe('ChainManagerService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [...RootModules(), ComponentTestingModule],
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
        { provide: StorageManagerService, useClass: StorageManagerMock },
      ],
    }),
  );

  it('should be created', () => {
    const service: ChainManagerService = TestBed.inject(ChainManagerService);
    expect(service).toBeTruthy();
  });
});
