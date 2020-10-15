import {TestBed} from '@angular/core/testing';

import {ChatListUpdaterService} from './chat-list-updater.service';

describe('ChatListUpdaterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatListUpdaterService = TestBed.inject(ChatListUpdaterService);
    expect(service).toBeTruthy();
  });
});
