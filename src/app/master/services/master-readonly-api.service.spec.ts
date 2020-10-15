import {TestBed} from '@angular/core/testing';

import {MasterReadonlyApiService} from './master-readonly-api.service';

describe('MasterReadonlyApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterReadonlyApiService = TestBed.inject(MasterReadonlyApiService);
    expect(service).toBeTruthy();
  });
});
