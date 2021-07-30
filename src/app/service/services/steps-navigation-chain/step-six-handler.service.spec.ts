import { TestBed } from '@angular/core/testing';
import { StorageManagerService } from '@app/core/services';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from 'src/testing/mocks';

import { ServicePublishDataHolderService } from '../service-publish-data-holder.service';
import { StepSixHandlerService } from './step-six-handler.service';

describe('StepSixHandlerService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [...RootModules(), ComponentTestingModule],
      providers: [
        StepSixHandlerService,
        ServicePublishDataHolderService,
        { provide: StorageManagerService, useClass: StorageManagerMock },
      ],
    }),
  );

  it('should be created', () => {
    const service: StepSixHandlerService = TestBed.inject(StepSixHandlerService);
    expect(service).toBeTruthy();
  });
});
