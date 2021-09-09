import { Injectable } from '@angular/core';
import { Profile } from '@app/api/models';
import { CommunicationService } from '@app/api/services';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { NewMessagesNotificationService } from '@app/core/services/new-messages-notification.service';

import { getChatListItems } from './chats-list-item.functions';
import { ChatsListItem } from './chats-list-item.interface';

@Injectable()
export class ChatsListService {
  public chatList$: Observable<ChatsListItem[]>;

  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<Profile>;

  constructor(
    private readonly api: CommunicationService,
    private readonly notifications: NewMessagesNotificationService,
  ) {
    this.chatList$ = combineLatest([this.profile$, this.notifications.unreadMessages$]).pipe(
      switchMap(([profile, unread]) =>
        this.api
          .communicationMessagesLatestList()
          .pipe(map(response => getChatListItems(response, unread.results, profile.id))),
      ),
    );
  }
}
