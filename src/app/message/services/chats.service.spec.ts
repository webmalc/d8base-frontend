import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StorageManagerMock } from 'src/testing/mocks';
import { StorageManagerService } from '../../core/proxies/storage-manager.service';
import { NotificationWorkerService } from '../../core/services/notification-worker.service';
import { ChatListUpdaterService } from './chat-list-updater.service';
import { ChatsCompilerService } from './chats-compiler.service';
import { ChatsSearchService } from './chats-search.service';
import { ChatsService } from './chats.service';
import { LatestMessagesApiService } from './latest-messages-api.service';
import { MessagesListApiService } from './messages-list-api.service';

describe('ChatsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ChatsService,
        ChatsCompilerService,
        ChatListUpdaterService,
        ChatsSearchService,
        LatestMessagesApiService,
        MessagesListApiService,
        NotificationWorkerService,
        { provide: StorageManagerService, useClass: StorageManagerMock },
      ],
    }),
  );

  it('should be created', () => {
    const service: ChatsService = TestBed.inject(ChatsService);
    expect(service).toBeTruthy();
  });
});
