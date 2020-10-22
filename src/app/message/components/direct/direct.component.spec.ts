import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule, PopoverController} from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {StorageManagerMock} from 'src/testing/mocks';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {NotificationWorkerService} from '../../../core/services/notification-worker.service';
import {DirectServiceService} from '../../services/direct-service.service';
import {MessageListUpdaterService} from '../../services/message-list-updater.service';
import {MessagesListApiService} from '../../services/messages-list-api.service';
import {MessagesSentApiService} from '../../services/messages-sent-api.service';
import {DirectComponent} from './direct.component';

describe('DirectComponent', () => {
    let component: DirectComponent;
    let fixture: ComponentFixture<DirectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DirectComponent],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                TranslateModule.forRoot(),
                HttpClientTestingModule
            ],
            providers: [
                DirectServiceService,
                PopoverController,
                MessageListUpdaterService,
                MessagesListApiService,
                MessagesSentApiService,
                NotificationWorkerService,
                {provide: StorageManagerService, useClass: StorageManagerMock}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DirectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
