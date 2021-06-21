import { Injectable } from '@angular/core';
import { Profile } from '@app/api/models';
import { CommunicationService } from '@app/api/services';
import { NgDestroyService } from '@app/core/services';
import { IntervalService } from '@app/message/shared/interval.service';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { environment } from '@env/environment';
import { Select } from '@ngxs/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { getChatListItems } from './chats-list-item.functions';
import { ChatsListItem } from './chats-list-item.interface';

@Injectable()
export class ChatsService {
  public chatList$: Observable<ChatsListItem[]>;

  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<Profile>;

  private readonly _fetchMessages$ = new BehaviorSubject<void>(void 0);

  constructor(
    private readonly api: CommunicationService,
    private readonly interval: IntervalService,
    private readonly ngDestroy$: NgDestroyService,
  ) {
    this.chatList$ = combineLatest([this.profile$, this._fetchMessages$]).pipe(
      switchMap(([profile]) =>
        this.api.communicationMessagesLatestList().pipe(map(response => getChatListItems(response, profile.id))),
      ),
    );
    this._fetchMessages$.next();
    this.subscribeToNotifications();
  }

  private subscribeToNotifications(): void {
    // TODO use notifications service
    this.interval
      .ticks(environment.message.chat_list_update_interval_ms)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(() => this._fetchMessages$.next());
  }
}
