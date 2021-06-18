import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StorageManagerMock } from 'src/testing/mocks';
import { StorageManagerService } from '../../../core/proxies/storage-manager.service';
import { NotificationWorkerService } from '../../../core/services/notification-worker.service';
import { ChatService } from './chat.service';

describe('DirectServiceService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ChatService,
        NotificationWorkerService,
        { provide: StorageManagerService, useClass: StorageManagerMock },
      ],
    }),
  );

  it('should be created', () => {
    const service: ChatService = TestBed.inject(ChatService);
    expect(service).toBeTruthy();
  });
});
