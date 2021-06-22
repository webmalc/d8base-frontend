import { Injectable } from '@angular/core';
import { CommunicationService } from '@app/api/services/communication.service';
import { IntervalService } from '@app/shared/services/interval.service';
import { environment } from '@env/environment';
import { shareReplay, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ReceivedMessage } from '@app/api/models';

@Injectable()
export class NewMessagesNotificationService {
  public unreadMessages$: Observable<{ count: number; next?: string; previous?: string; results: ReceivedMessage[] }>;

  constructor(private readonly api: CommunicationService, private readonly interval: IntervalService) {
    this.unreadMessages$ = this.interval.ticks(environment.message.chat_list_update_interval_ms).pipe(
      switchMap(() => this.api.communicationMessagesReceivedList({ isRead: 'false' })),
      shareReplay(1),
    );
  }
}
