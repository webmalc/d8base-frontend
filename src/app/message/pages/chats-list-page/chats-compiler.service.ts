import { Injectable } from '@angular/core';
import { CommunicationService } from '@app/api/services';
import { fromDatetime } from '@app/core/functions/datetime.functions';
import { HelperService } from '@app/core/services/helper.service';
import { UserManagerService } from '@app/core/services/user-manager.service';
import { LatestMessageInterface } from '@app/message/shared/latest-message-interface';
import { AbstractMessage } from '@app/message/shared/abstract-message';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable()
export class ChatsCompilerService {
  constructor(private readonly api: CommunicationService, private readonly userManager: UserManagerService) {}

  public async generateChatList(): Promise<AbstractMessage[]> {
    return await this.api
      .communicationMessagesLatestList()
      .pipe(
        map(async (list: LatestMessageInterface[]) => {
          const res: AbstractMessage[] = [];
          for (const mes of list) {
            const abstractMessage: AbstractMessage = (await this.getInterlocutorData(mes)) as AbstractMessage;
            abstractMessage.body = mes.body;
            abstractMessage.is_read = mes.is_read;
            abstractMessage.created = fromDatetime(mes.created).time;
            abstractMessage.unread_count = await this.getUnreadCount(mes);
            res.push(abstractMessage);
          }

          return res;
        }),
      )
      .toPromise();
  }

  private getUnreadCount(message: LatestMessageInterface): Promise<number> {
    const requestById = (interlocutorId: number): Observable<number> =>
      this.api.communicationMessagesListList({ isRead: 'false', sender: interlocutorId }).pipe(map(list => list.count));
    return this.userManager
      .getCurrentUser()
      .pipe(
        filter(user => Boolean(user)),
        switchMap(user => requestById(message.sender.id === user.id ? message.recipient.id : message.sender.id)),
      )
      .toPromise();
  }

  private getInterlocutorData(message: LatestMessageInterface): Promise<Partial<AbstractMessage>> {
    return this.userManager
      .getCurrentUser()
      .pipe(
        filter(user => Boolean(user)),
        map(user => {
          const data =
            message.sender.id !== user.id
              ? {
                  interlocutor: `${message.sender.first_name} ${message.sender.last_name ?? ''}`,
                  interlocutor_id: message.sender.id,
                  interlocutor_avatar_thumbnail: message.sender.avatar_thumbnail,
                }
              : {
                  interlocutor: `${message.recipient.first_name} ${message.recipient.last_name ?? ''}`,
                  interlocutor_id: message.recipient.id,
                  interlocutor_avatar_thumbnail: message.recipient.avatar_thumbnail,
                };

          data.interlocutor_avatar_thumbnail = data.interlocutor_avatar_thumbnail
            ? this.getHost() + data.interlocutor_avatar_thumbnail
            : HelperService.getNoAvatarLink();

          return data;
        }),
      )
      .toPromise();
  }

  private getHost(): string {
    return environment.backend.url;
  }
}
