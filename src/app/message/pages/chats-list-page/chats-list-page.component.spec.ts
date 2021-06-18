import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { NotificationWorkerService } from '@app/core/services/notification-worker.service';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from 'src/testing/mocks';
import { ChatListUpdaterService } from './chat-list-updater.service';
import { ChatsCompilerService } from './chats-compiler.service';
import { ChatsSearchService } from './chats-search.service';
import { ChatsService } from './chats.service';
import { ChatsListPageComponent } from './chats-list-page.component';

describe('ChatsComponent', () => {
  let component: ChatsListPageComponent;
  let fixture: ComponentFixture<ChatsListPageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ChatsListPageComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [
          ChatsService,
          ChatsCompilerService,
          ChatListUpdaterService,
          ChatsSearchService,
          NotificationWorkerService,
          { provide: StorageManagerService, useClass: StorageManagerMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ChatsListPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
