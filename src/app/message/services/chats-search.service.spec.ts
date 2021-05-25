import { TestBed } from '@angular/core/testing';

import { ChatsSearchService } from './chats-search.service';

describe('ChatsSearchService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ChatsSearchService],
    }),
  );

  it('should be created', () => {
    const service: ChatsSearchService = TestBed.inject(ChatsSearchService);
    expect(service).toBeTruthy();
  });
});
