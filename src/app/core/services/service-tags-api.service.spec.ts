import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ServiceTagsApiService } from './service-tags-api.service';

describe('ServiceTagsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      ServiceTagsApiService,
    ],
  }));

  it('should be created', () => {
    const service: ServiceTagsApiService = TestBed.inject(ServiceTagsApiService);
    expect(service).toBeTruthy();
  });
});
