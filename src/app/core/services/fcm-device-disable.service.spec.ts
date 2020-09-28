import {TestBed} from '@angular/core/testing';

import {FcmDeviceDisableService} from './fcm-device-disable.service';

describe('FcmDeviceDisableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FcmDeviceDisableService = TestBed.get(FcmDeviceDisableService);
    expect(service).toBeTruthy();
  });
});
