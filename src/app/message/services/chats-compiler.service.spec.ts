import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {StorageManagerService} from '../../core/proxies/storage-manager.service';
import {StorageManagerMock} from '../../core/services/token-manager.service.spec';
import {ChatsCompilerService} from './chats-compiler.service';
import {LatestMessagesApiService} from './latest-messages-api.service';
import {MessagesListApiService} from './messages-list-api.service';

describe('ChatsCompilerService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            ChatsCompilerService,
            LatestMessagesApiService,
            MessagesListApiService,
            {provide: StorageManagerService, useClass: StorageManagerMock}
        ]
    }));

    it('should be created', () => {
        const service: ChatsCompilerService = TestBed.inject(ChatsCompilerService);
        expect(service).toBeTruthy();
    });
});
