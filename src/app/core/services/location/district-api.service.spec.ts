import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DistrictApiService} from './district-api.service';

describe('DistrictApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [DistrictApiService]
  }));

  it('should be created', () => {
    const service: DistrictApiService = TestBed.inject(DistrictApiService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
