import {TestBed} from '@angular/core/testing';

import {MessageService} from './message.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ApiClientService} from '../../core/services/api-client.service';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MessageService,
        ApiClientService,
        {
          provide: String,
          useValue: 'http://example.com'
        }
      ]
    });
  });

  it('should be created', () => {
    const service: MessageService = TestBed.inject(MessageService);
    expect(service).toBeTruthy();
  });
});
