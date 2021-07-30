import { TestBed } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from 'src/testing/mocks';
import { StorageManagerService } from '@app/core/services';

import { ServicePublishAuthStateManagerService } from './service-publish-auth-state-manager.service';
import { ServicePublishDataHolderService } from './service-publish-data-holder.service';

describe('ServicePublishAuthStateManagerService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [...RootModules(), ComponentTestingModule],
      providers: [
        ServicePublishAuthStateManagerService,
        ServicePublishDataHolderService,
        { provide: StorageManagerService, useClass: StorageManagerMock },
      ],
    }),
  );

  it('should be created', () => {
    const service: ServicePublishAuthStateManagerService = TestBed.inject(ServicePublishAuthStateManagerService);
    expect(service).toBeTruthy();
  });
});
