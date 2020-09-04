import {TestBed} from '@angular/core/testing';

import {MessageListUpdaterService} from './message-list-updater.service';

describe('MessageListUpdaterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageListUpdaterService = TestBed.get(MessageListUpdaterService);
    expect(service).toBeTruthy();
  });
});
