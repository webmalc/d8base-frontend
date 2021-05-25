import { Injectable } from '@angular/core';
import { ReceivedMessage } from '@app/api/models';
import { CommunicationService } from '@app/api/services';
import { NotificationWorkerService } from '@app/core/services/notification-worker.service';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { environment } from '@env/environment';
import { Select, Store } from '@ngxs/store';
import { interval, Observable, of } from 'rxjs';
import { map, mapTo, repeat, shareReplay, startWith, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UnreadMessagesService {
  @Select(CurrentUserSelectors.isAuthenticated)
  private readonly isAuthenticated$: Observable<boolean>;

  private readonly updateInterval: number = environment.message.direct_update_interval_ms;

  private unreadMessages$: Observable<{
    count: number;
    next?: null | string;
    previous?: null | string;
    results: Array<ReceivedMessage>;
  }>;

  constructor(
    private readonly communicationService: CommunicationService,
    private readonly notificationWorker: NotificationWorkerService,
  ) {
    this.initUnreadMessages();
  }

  public unreadMessages(): Observable<{
    count: number;
    next?: null | string;
    previous?: null | string;
    results: Array<ReceivedMessage>;
  }> {
    return this.unreadMessages$;
  }

  public unreadMessagesCount(): Observable<number> {
    return this.unreadMessages$.pipe(map(response => response?.count));
  }

  private initUnreadMessages(): void {
    this.unreadMessages$ = this.isAuthenticated$.pipe(
      switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          return of(null);
        }

        const repeater$ = this.isFirebaseSupported()
          ? this.notificationWorker.messageReceived$
          : interval(this.updateInterval).pipe(repeat(), mapTo(true));

        return repeater$.pipe(
          startWith(true),
          switchMap(() => this.communicationService.communicationMessagesReceivedList({ isRead: 'false' })),
        );
      }),
      shareReplay(1),
    );
  }

  private isFirebaseSupported(): boolean {
    return NotificationWorkerService.isFirebaseSupported();
  }
}
