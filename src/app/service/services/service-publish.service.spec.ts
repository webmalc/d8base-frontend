import { TestBed } from '@angular/core/testing';
import { StorageManagerService } from '@app/core/services';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from 'src/testing/mocks';

import { ServicePublishDataHolderService } from './service-publish-data-holder.service';
import { ServicePublishDataPreparerService } from './service-publish-data-preparer.service';
import { ServicePublishService } from './service-publish.service';

describe('ServicePublishService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [...RootModules(), ComponentTestingModule],
      providers: [
        ServicePublishService,
        { provide: StorageManagerService, useClass: StorageManagerMock },
        ServicePublishDataHolderService,
        ServicePublishDataPreparerService,
      ],
    }),
  );

  it('should be created', () => {
    const service: ServicePublishService = TestBed.inject(ServicePublishService);
    expect(service).toBeTruthy();
  });
});
