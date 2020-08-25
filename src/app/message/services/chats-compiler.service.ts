import {Injectable} from '@angular/core';
import {LatestMessagesApiService} from '@app/message/services/latest-messages-api.service';
import {AbstractMessage} from '@app/message/models/abstract-message';
import {map} from 'rxjs/operators';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {LatestMessageInterface} from '@app/message/interfaces/latest-message-interface';
import {Observable} from 'rxjs';

@Injectable()
export class ChatsCompilerService {

    constructor(private latestMessagesApi: LatestMessagesApiService, private userManager: UserManagerService) {
    }

    public generateChatList(): Observable<AbstractMessage[]> {
        return this.latestMessagesApi.get().pipe(
            map(list => {
                const res: AbstractMessage[] = [];
                list.results.forEach(async mes => {
                    const abstractMessage: AbstractMessage = await this.getInterlocutorData(mes) as AbstractMessage;
                    abstractMessage.body = mes.body;
                    abstractMessage.is_read = mes.is_read;
                    abstractMessage.created = mes.created;
                    res.push(abstractMessage);
                });

                return res.reverse();
            })
        );
    }

    private getInterlocutorData(message: LatestMessageInterface): Promise<Partial<AbstractMessage>> {
        return this.userManager.getCurrentUser().pipe(
            map(user => {
                if (message.sender.email === user.email) {
                    return {
                        interlocutor: `${message.sender.first_name} ${message.sender.last_name}`,
                        interlocutor_id: message.sender.id,
                        interlocutor_avatar_thumbnail: message.sender.avatar_thumbnail
                    };
                }

                return {
                    interlocutor: `${message.recipient.first_name} ${message.recipient.last_name}`,
                    interlocutor_id: message.recipient.id,
                    interlocutor_avatar_thumbnail: message.recipient.avatar_thumbnail
                };
            })
        ).toPromise();
    }
}
