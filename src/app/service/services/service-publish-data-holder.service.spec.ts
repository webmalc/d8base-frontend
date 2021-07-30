import { TestBed } from '@angular/core/testing';

import { StorageManagerMock } from 'src/testing/mocks';
import { StorageManagerService } from '../../core/services/storage-manager.service';
import { ServicePublishDataHolderService } from './service-publish-data-holder.service';

describe('ServicePublishDataHolderService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ServicePublishDataHolderService, { provide: StorageManagerService, useClass: StorageManagerMock }],
    }),
  );

  it('should be created', () => {
    const service: ServicePublishDataHolderService = TestBed.inject(ServicePublishDataHolderService);
    expect(service).toBeTruthy();
  });
});
