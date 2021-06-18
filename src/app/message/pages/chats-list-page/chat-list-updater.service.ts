import { Injectable } from '@angular/core';
import { NotificationWorkerService } from '@app/core/services/notification-worker.service';
import { AbstractMessage } from '@app/message/shared/abstract-message';
import { ChatsCompilerService } from '@app/message/pages/chats-list-page/chats-compiler.service';
import { environment } from '@env/environment';
import { from, Observable, Subject } from 'rxjs';
import { delay, repeat, switchMap, takeUntil } from 'rxjs/operators';

@Injectable()
export class ChatListUpdaterService {
  private readonly updateInterval: number = environment.message.chat_list_update_interval_ms;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly chatsCompilerService: ChatsCompilerService,
    private readonly notificationWorker: NotificationWorkerService,
  ) {}

  public receiveUpdates(): Observable<AbstractMessage[]> {
    this.destroy();

    return NotificationWorkerService.isFirebaseSupported()
      ? this.notificationWorker.messageReceived$.pipe(
          switchMap(() => this.getChatList()),
          takeUntil(this.destroy$),
        )
      : this.getChatList().pipe(
          delay(this.updateInterval),
          repeat(),
          switchMap(() => this.getChatList()),
          takeUntil(this.destroy$),
        );
  }

  public getChatList(): Observable<AbstractMessage[]> {
    return from(this.chatsCompilerService.generateChatList());
  }

  public destroy(): void {
    this.destroy$.next();
  }
}
