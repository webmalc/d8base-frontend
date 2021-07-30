import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getNoAvatarLink } from '@app/core/functions/media.functions';
import { NgDestroyService } from '@app/core/services';
import { ChatsListService } from '@app/message/pages/chats-list-page/chats-list.service';
import { Observable } from 'rxjs';

import { ChatsListItem } from './chats-list-item.interface';

@Component({
  selector: 'app-chats-list-page',
  templateUrl: './chats-list-page.component.html',
  styleUrls: ['./chats-list-page.component.scss'],
  providers: [ChatsListService, NgDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsListPageComponent {
  public searchString: string;

  constructor(private readonly chatsService: ChatsListService) {}

  public get chatList$(): Observable<ChatsListItem[]> {
    return this.chatsService.chatList$;
  }

  public search(searchString: string): void {
    this.searchString = searchString;
  }

  public getAvatar(interlocutor: ChatsListItem): string {
    return interlocutor.avatarThumbnail ?? getNoAvatarLink();
  }

  public getTrackById(index: number, item: ChatsListItem): string {
    return item.trackById;
  }
}
