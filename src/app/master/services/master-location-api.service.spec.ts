import {TestBed} from '@angular/core/testing';

import {MasterLocationApiService} from './master-location-api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MasterLocationApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [MasterLocationApiService]
  }));

  it('should be created', () => {
    const service: MasterLocationApiService = TestBed.inject(MasterLocationApiService);
    expect(service).toBeTruthy();
  });
});
