import { TestBed } from '@angular/core/testing';

import { ServiceScheduleApiService } from './service-schedule-api.service';

describe('ServiceScheduleApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceScheduleApiService = TestBed.get(ServiceScheduleApiService);
    expect(service).toBeTruthy();
  });
});
