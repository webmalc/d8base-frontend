import {TestBed} from '@angular/core/testing';

import {NotificationWorkerService} from './notification-worker.service';

describe('NotificationWorkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationWorkerService = TestBed.get(NotificationWorkerService);
    expect(service).toBeTruthy();
  });
});
