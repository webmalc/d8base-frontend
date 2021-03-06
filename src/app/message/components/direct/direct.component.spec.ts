import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { NotificationWorkerService } from '@app/core/services/notification-worker.service';
import { MessagePageModule } from '@app/message/message.module';
import { IonicModule, PopoverController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StorageManagerMock } from 'src/testing/mocks';
import { DirectServiceService } from '../../services/direct-service.service';
import { MessageListUpdaterService } from '../../services/message-list-updater.service';
import { MessagesListApiService } from '../../services/messages-list-api.service';
import { MessagesSentApiService } from '../../services/messages-sent-api.service';
import { DirectComponent } from './direct.component';

describe('DirectComponent', () => {
  let component: DirectComponent;
  let fixture: ComponentFixture<DirectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DirectComponent],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        MessagePageModule,
      ],
      providers: [
        DirectServiceService,
        PopoverController,
        MessageListUpdaterService,
        MessagesListApiService,
        MessagesSentApiService,
        NotificationWorkerService,
        { provide: StorageManagerService, useClass: StorageManagerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
