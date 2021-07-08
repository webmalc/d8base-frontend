import { TestBed } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { ServicePublishDataHolderService } from './service-publish-data-holder.service';
import { ServicePublishDataPreparerService } from './service-publish-data-preparer.service';

describe('ServicePublishDataPreparerService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [...RootModules(), ComponentTestingModule],
      providers: [ServicePublishDataPreparerService, ServicePublishDataHolderService],
    }),
  );

  it('should be created', () => {
    const service: ServicePublishDataPreparerService = TestBed.inject(ServicePublishDataPreparerService);
    expect(service).toBeTruthy();
  });
});
