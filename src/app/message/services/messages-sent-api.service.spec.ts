import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessagesSentApiService } from './messages-sent-api.service';

describe('MessagesSentApiService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MessagesSentApiService],
    }),
  );

  it('should be created', () => {
    const service: MessagesSentApiService = TestBed.inject(MessagesSentApiService);
    expect(service).toBeTruthy();
  });
});
