import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserLocationApiService } from './user-location-api.service';

describe('LocationApiService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserLocationApiService],
    }),
  );

  it('should be created', () => {
    const service: UserLocationApiService = TestBed.inject(UserLocationApiService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
