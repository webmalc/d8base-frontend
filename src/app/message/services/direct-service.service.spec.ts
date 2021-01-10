import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StorageManagerMock } from 'src/testing/mocks';
import { StorageManagerService } from '../../core/proxies/storage-manager.service';
import { NotificationWorkerService } from '../../core/services/notification-worker.service';
import { DirectServiceService } from './direct-service.service';
import { MessageListUpdaterService } from './message-list-updater.service';
import { MessagesListApiService } from './messages-list-api.service';
import { MessagesSentApiService } from './messages-sent-api.service';

describe('DirectServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      DirectServiceService,
      MessageListUpdaterService,
      MessagesListApiService,
      MessagesSentApiService,
      NotificationWorkerService,
      { provide: StorageManagerService, useClass: StorageManagerMock },
    ],
  }));

  it('should be created', () => {
    const service: DirectServiceService = TestBed.inject(DirectServiceService);
    expect(service).toBeTruthy();
  });
});
