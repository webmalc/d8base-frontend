import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StorageManagerMock } from 'src/testing/mocks';
import { StorageManagerService } from '../../core/proxies/storage-manager.service';
import { ServicePublishAuthStateManagerService } from './service-publish-auth-state-manager.service';
import { ServicePublishDataHolderService } from './service-publish-data-holder.service';

describe('ServicePublishAuthStateManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      ServicePublishAuthStateManagerService,
      ServicePublishDataHolderService,
      { provide: StorageManagerService, useClass: StorageManagerMock },
    ],
  }));

  it('should be created', () => {
    const service: ServicePublishAuthStateManagerService = TestBed.inject(ServicePublishAuthStateManagerService);
    expect(service).toBeTruthy();
  });
});
