import {TestBed} from '@angular/core/testing';

import {MessagesSentApiService} from './messages-sent-api.service';

describe('MessagesSentApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessagesSentApiService = TestBed.get(MessagesSentApiService);
    expect(service).toBeTruthy();
  });
});
