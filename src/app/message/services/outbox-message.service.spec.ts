import { TestBed } from '@angular/core/testing';

import { OutboxMessageService } from './outbox-message.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('OutboxMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: OutboxMessageService = TestBed.inject(OutboxMessageService);
    expect(service).toBeTruthy();
  });
});
