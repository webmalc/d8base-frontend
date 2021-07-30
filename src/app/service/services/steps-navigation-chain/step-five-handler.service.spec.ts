import { TestBed } from '@angular/core/testing';

import { StorageManagerMock } from 'src/testing/mocks';
import { StorageManagerService } from '../../../core/services/storage-manager.service';
import { ServicePublishDataHolderService } from '../service-publish-data-holder.service';
import { StepFiveHandlerService } from './step-five-handler.service';

describe('StepFiveHandlerService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        StepFiveHandlerService,
        ServicePublishDataHolderService,
        { provide: StorageManagerService, useClass: StorageManagerMock },
      ],
    }),
  );

  it('should be created', () => {
    const service: StepFiveHandlerService = TestBed.inject(StepFiveHandlerService);
    expect(service).toBeTruthy();
  });
});
