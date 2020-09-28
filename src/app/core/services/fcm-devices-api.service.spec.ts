import {TestBed} from '@angular/core/testing';

import {FcmDevicesApiService} from './fcm-devices-api.service';

describe('FcmDevicesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FcmDevicesApiService = TestBed.get(FcmDevicesApiService);
    expect(service).toBeTruthy();
  });
});
