import {TestBed} from '@angular/core/testing';

import {MasterPhotosApiService} from './master-photos-api.service';

describe('MasterPhotosApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterPhotosApiService = TestBed.inject(MasterPhotosApiService);
    expect(service).toBeTruthy();
  });
});
