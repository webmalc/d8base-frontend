import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageListUpdaterService } from './message-list-updater.service';
import { MessagesListApiService } from './messages-list-api.service';

describe('MessageListUpdaterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      MessageListUpdaterService,
      MessagesListApiService,
    ],
  }));

  it('should be created', () => {
    const service: MessageListUpdaterService = TestBed.inject(MessageListUpdaterService);
    expect(service).toBeTruthy();
  });
});
