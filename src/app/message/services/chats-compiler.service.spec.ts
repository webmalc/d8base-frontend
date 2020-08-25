import {TestBed} from '@angular/core/testing';

import {ChatsCompilerService} from './chats-compiler.service';

describe('ChatsCompilerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatsCompilerService = TestBed.get(ChatsCompilerService);
    expect(service).toBeTruthy();
  });
});
