import {TestBed} from '@angular/core/testing';

import {DistrictApiService} from './district-api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

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
