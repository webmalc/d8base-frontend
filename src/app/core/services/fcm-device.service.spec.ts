import {TestBed} from '@angular/core/testing';

import {FcmDeviceService} from './fcm-device.service';

describe('NotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FcmDeviceService = TestBed.inject(FcmDeviceService);
    expect(service).toBeTruthy();
  });
});
