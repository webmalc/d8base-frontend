import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MasterReadonlyApiService } from './master-readonly-api.service';

describe('MasterReadonlyApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      MasterReadonlyApiService,
    ],
  }));

  it('should be created', () => {
    const service: MasterReadonlyApiService = TestBed.inject(MasterReadonlyApiService);
    expect(service).toBeTruthy();
  });
});
