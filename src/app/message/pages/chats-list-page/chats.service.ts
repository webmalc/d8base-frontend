import { Injectable } from '@angular/core';
import { AbstractMessage } from '@app/message/shared/abstract-message';
import { ChatListUpdaterService } from '@app/message/pages/chats-list-page/chat-list-updater.service';
import { ChatsSearchService } from '@app/message/pages/chats-list-page/chats-search.service';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';

@Injectable()
export class ChatsService {
  @Select(CurrentUserSelectors.isAuthenticated)
  public isAuthenticated$: Observable<boolean>;

  public chatList$: BehaviorSubject<AbstractMessage[]> = new BehaviorSubject<AbstractMessage[]>(null);
  private defaultChatList: AbstractMessage[] = [];
  private chatsSubscription: Subscription;

  constructor(private readonly chatListUpdater: ChatListUpdaterService, private readonly search: ChatsSearchService) {
    this.isAuthenticated$
      .pipe(
        filter(isAuthenticated => Boolean(isAuthenticated)),
        switchMap(() => this.initChatList()),
      )
      .subscribe(() => this.subscribeToChatListUpdates());
    this.isAuthenticated$.pipe(filter(isAuthenticated => !isAuthenticated)).subscribe(() => {
      this.unsubscribeFromUpdates();
      this.setLists([]);
    });
  }

  public doSearch(value: string): void {
    if ('' === value) {
      this.subscribeToChatListUpdates();
      this.chatList$.next(this.defaultChatList);
    } else {
      this.unsubscribeFromUpdates();
      this.chatList$.next(this.search.search(this.defaultChatList, value));
    }
  }

  public destroy(): void {
    this.unsubscribeFromUpdates();
    this.chatListUpdater.destroy();
    this.chatList$.next([]);
  }

  public initChatList(): Observable<any> {
    return this.chatListUpdater.getChatList().pipe(map(list => this.setLists(list)));
  }

  public subscribeToChatListUpdates(): void {
    this.unsubscribeFromUpdates();
    this.chatsSubscription = this.chatListUpdater.receiveUpdates().subscribe((newList: AbstractMessage[]) =>
      this.isNeedToUpdate(newList)
        .pipe(filter(isNeed => isNeed))
        .subscribe(() => this.setLists(newList)),
    );
  }

  private unsubscribeFromUpdates(): void {
    if (this.chatsSubscription) {
      this.chatsSubscription.unsubscribe();
    }
    this.chatsSubscription = undefined;
  }

  private setLists(data: AbstractMessage[]): void {
    this.chatList$.next(data);
    this.defaultChatList = data;
  }

  private isNeedToUpdate(chatList: AbstractMessage[]): Observable<boolean> {
    return this.chatList$.pipe(
      first(),
      map((defaultList: AbstractMessage[]) => {
        if (defaultList.length !== chatList.length) {
          return true;
        }
        for (let i = 0; i < chatList.length; i += 1) {
          if (
            chatList[i].interlocutor_id !== defaultList[i].interlocutor_id ||
            chatList[i].is_read !== defaultList[i].is_read ||
            chatList[i].body !== defaultList[i].body ||
            chatList[i].unread_count !== defaultList[i].unread_count
          ) {
            return true;
          }
        }

        return false;
      }),
    );
  }
}
