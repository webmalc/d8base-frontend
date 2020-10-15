import {TestBed} from '@angular/core/testing';

import {ChatsSearchService} from './chats-search.service';

describe('ChatsSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatsSearchService = TestBed.inject(ChatsSearchService);
    expect(service).toBeTruthy();
  });
});
