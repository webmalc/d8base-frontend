import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {StorageManagerMock} from 'src/testing/mocks';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {NotificationWorkerService} from '../../../core/services/notification-worker.service';
import {ChatListUpdaterService} from '../../services/chat-list-updater.service';
import {ChatsCompilerService} from '../../services/chats-compiler.service';
import {ChatsSearchService} from '../../services/chats-search.service';
import {ChatsService} from '../../services/chats.service';
import {LatestMessagesApiService} from '../../services/latest-messages-api.service';
import {MessagesListApiService} from '../../services/messages-list-api.service';
import {ChatsComponent} from './chats.component';

describe('ChatsComponent', () => {
    let component: ChatsComponent;
    let fixture: ComponentFixture<ChatsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChatsComponent],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
                TranslateModule.forRoot()
            ],
            providers: [
                ChatsService,
                ChatsCompilerService,
                ChatListUpdaterService,
                ChatsSearchService,
                LatestMessagesApiService,
                MessagesListApiService,
                NotificationWorkerService,
                {provide: StorageManagerService, useClass: StorageManagerMock}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ChatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
