import { Injectable } from '@angular/core';
import { CommunicationService } from '@app/api/services/communication.service';
import { AuthenticationService } from '@app/core/services';
import { IntervalService } from '@app/shared/services/interval.service';
import { environment } from '@env/environment';
import { catchError, shareReplay, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ReceivedMessage } from '@app/api/models';

type ResponseData = { count: number; next?: string; previous?: string; results: ReceivedMessage[] };

const emptyResponse = {
  count: 0,
  results: [],
};

@Injectable()
export class NewMessagesNotificationService {
  public unreadMessages$: Observable<ResponseData>;

  constructor(
    private readonly auth: AuthenticationService,
    private readonly api: CommunicationService,
    private readonly interval: IntervalService,
  ) {
    this.unreadMessages$ = this.auth.isAuthenticated$.pipe(
      switchMap(isAuthenticated => (isAuthenticated ? this.getNewMessages() : of(emptyResponse))),
      catchError(() => of(emptyResponse)),
      shareReplay(1),
    );
  }

  private getNewMessages(): Observable<ResponseData> {
    return this.interval
      .ticks(environment.message.chat_list_update_interval_ms)
      .pipe(switchMap(() => this.api.communicationMessagesReceivedList({ isRead: 'false' })));
  }
}
