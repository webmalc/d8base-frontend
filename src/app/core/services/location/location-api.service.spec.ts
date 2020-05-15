import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import { LocationApiService } from './location-api.service';

describe('LocationApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
          LocationApiService
      ]
  }));

  it('should be created', () => {
    const service: LocationApiService = TestBed.inject(LocationApiService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
