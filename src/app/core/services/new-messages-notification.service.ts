import { Injectable } from '@angular/core';
import { ReceivedMessage } from '@app/api/models';
import { CommunicationService } from '@app/api/services';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, switchMap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { IntervalService } from './interval.service';

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
