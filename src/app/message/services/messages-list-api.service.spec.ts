import {TestBed} from '@angular/core/testing';

import {MessagesListApiService} from './messages-list-api.service';

describe('MessagesListApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessagesListApiService = TestBed.inject(MessagesListApiService);
    expect(service).toBeTruthy();
  });
});
