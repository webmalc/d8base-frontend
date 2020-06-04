import {TestBed} from '@angular/core/testing';

import {InboxMessageService} from './inbox-message.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ApiClientService} from '../../core/services/api-client.service';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        InboxMessageService,
        ApiClientService,
        {
          provide: String,
          useValue: 'http://example.com/'
        }
      ]
    });
  });

  it('should be created', () => {
    const service: InboxMessageService = TestBed.inject(InboxMessageService);
    expect(service).toBeTruthy();
  });
});
