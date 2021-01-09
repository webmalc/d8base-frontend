import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CountriesApiService } from './countries-api.service';

describe('CountriesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
        CountriesApiService,
    ],
  }));

  it('should be created', () => {
    const service: CountriesApiService = TestBed.inject(CountriesApiService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
