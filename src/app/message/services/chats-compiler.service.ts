import { Injectable } from '@angular/core';
import { fromDatetime } from '@app/core/functions/datetime.functions';
import { HelperService } from '@app/core/services/helper.service';
import { UserManagerService } from '@app/core/services/user-manager.service';
import { LatestMessageInterface } from '@app/message/interfaces/latest-message-interface';
import { AbstractMessage } from '@app/message/models/abstract-message';
import { LatestMessagesApiService } from '@app/message/services/latest-messages-api.service';
import { MessagesListApiService } from '@app/message/services/messages-list-api.service';
import { environment } from '@env/environment';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable()
export class ChatsCompilerService {

  constructor(
    private readonly latestMessagesApi: LatestMessagesApiService,
    private readonly userManager: UserManagerService,
    private readonly messagesListApiService: MessagesListApiService,
  ) {
  }

  public async generateChatList(): Promise<AbstractMessage[]> {
    return await this.latestMessagesApi.get().pipe(
      map(async (list: LatestMessageInterface[]) => {
        const res: AbstractMessage[] = [];
        for (const mes of list) {
          const abstractMessage: AbstractMessage = await this.getInterlocutorData(mes) as AbstractMessage;
          abstractMessage.body = mes.body;
          abstractMessage.is_read = mes.is_read;
          abstractMessage.created = fromDatetime(mes.created).time;
          abstractMessage.unread_count = await this.getUnreadCount(mes);
          res.push(abstractMessage);
        }

        return res;
      }),
    ).toPromise();
  }

  private getUnreadCount(message: LatestMessageInterface): Promise<number> {
    return this.userManager.getCurrentUser().pipe(
      filter((user) => Boolean(user)),
      switchMap(user => this.messagesListApiService.getUnreadCount(
        message.sender.id === user.id ? message.recipient.id : message.sender.id),
      ),
    ).toPromise();
  }

  private getInterlocutorData(message: LatestMessageInterface): Promise<Partial<AbstractMessage>> {
    return this.userManager.getCurrentUser().pipe(
      filter((user) => Boolean(user)),
      map(user => {
        const data = message.sender.id !== user.id ? {
          interlocutor: `${message.sender.first_name} ${message.sender.last_name ?? ''}`,
          interlocutor_id: message.sender.id,
          interlocutor_avatar_thumbnail: message.sender.avatar_thumbnail,
        } : {
          interlocutor: `${message.recipient.first_name} ${message.recipient.last_name ?? ''}`,
          interlocutor_id: message.recipient.id,
          interlocutor_avatar_thumbnail: message.recipient.avatar_thumbnail,
        };

        data.interlocutor_avatar_thumbnail = data.interlocutor_avatar_thumbnail ?
          this.getHost() + data.interlocutor_avatar_thumbnail :
          HelperService.getNoAvatarLink();

        return data;
      }),
    ).toPromise();
  }

  private getHost(): string {
    return environment.backend.url;
  }
}
