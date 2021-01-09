import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ServiceLocationApiService } from './service-location-api.service';

describe('ServiceLocationApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      ServiceLocationApiService,
    ],
  }));

  it('should be created', () => {
    const service: ServiceLocationApiService = TestBed.inject(ServiceLocationApiService);
    expect(service).toBeTruthy();
  });
});
