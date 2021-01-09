import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MasterLocationApiService } from './master-location-api.service';

describe('MasterLocationApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [MasterLocationApiService],
  }));

  it('should be created', () => {
    const service: MasterLocationApiService = TestBed.inject(MasterLocationApiService);
    expect(service).toBeTruthy();
  });
});
