import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StorageManagerMock } from 'src/testing/mocks';
import { StorageManagerService } from '../../../core/proxies/storage-manager.service';
import { ServicePublishDataHolderService } from '../service-publish-data-holder.service';
import { StepSixHandlerService } from './step-six-handler.service';

describe('StepSixHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      StepSixHandlerService,
      ServicePublishDataHolderService,
      { provide: StorageManagerService, useClass: StorageManagerMock },
    ],
  }));

  it('should be created', () => {
    const service: StepSixHandlerService = TestBed.inject(StepSixHandlerService);
    expect(service).toBeTruthy();
  });
});
