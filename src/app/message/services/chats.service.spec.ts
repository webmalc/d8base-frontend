import {TestBed} from '@angular/core/testing';

import {ChatsService} from './chats.service';

describe('ChatsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatsService = TestBed.inject(ChatsService);
    expect(service).toBeTruthy();
  });
});
