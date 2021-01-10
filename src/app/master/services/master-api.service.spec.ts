import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MasterApiService } from './master-api.service';

describe('MasterApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      MasterApiService,
    ],
  }));

  it('should be created', () => {
    const service: MasterApiService = TestBed.inject(MasterApiService);
    expect(service).toBeTruthy();
  });
});
