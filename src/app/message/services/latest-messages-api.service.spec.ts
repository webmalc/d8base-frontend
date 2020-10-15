import {TestBed} from '@angular/core/testing';

import {LatestMessagesApiService} from './latest-messages-api.service';

describe('LatestMessagesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LatestMessagesApiService = TestBed.inject(LatestMessagesApiService);
    expect(service).toBeTruthy();
  });
});
