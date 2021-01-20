import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StorageManagerMock } from 'src/testing/mocks';
import { StorageManagerService } from '../../core/proxies/storage-manager.service';
import { PricesApiService } from '../../core/services/prices-api.service';
import { ServiceLocationApiService } from '../../core/services/service-location-api.service';
import { ServicePhotoApiService } from '../../core/services/service-photo-api.service';
import { ServiceScheduleApiService } from '../../core/services/service-schedule-api.service';
import { ServicePublishDataHolderService } from './service-publish-data-holder.service';
import { ServicePublishDataPreparerService } from './service-publish-data-preparer.service';
import { ServicePublishService } from './service-publish.service';

describe('ServicePublishService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      ServicePublishService,
      { provide: StorageManagerService, useClass: StorageManagerMock },
      ServicePublishDataHolderService,
      ServicePhotoApiService,
      ServiceScheduleApiService,
      ServiceLocationApiService,
      PricesApiService,
      ServicePublishDataPreparerService,
    ],
  }));

  it('should be created', () => {
    const service: ServicePublishService = TestBed.inject(ServicePublishService);
    expect(service).toBeTruthy();
  });
});
