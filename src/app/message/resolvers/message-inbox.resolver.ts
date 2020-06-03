import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {MessageInterface} from '@app/message/interfaces/message-interface';
import {Observable} from 'rxjs';
import {InboxMessageService} from '@app/message/services/inbox-message.service';
import {Injectable} from '@angular/core';

@Injectable()
export class MessageInboxResolver implements Resolve<MessageInterface> {
    constructor(private messageService: InboxMessageService) {}

    public resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<MessageInterface> | Promise<MessageInterface> | MessageInterface {
        return this.messageService.readMessage(+route.params.id);
    }

}
