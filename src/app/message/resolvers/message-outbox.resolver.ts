import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MessageInterface} from '../interfaces/message-interface';
import {OutboxMessageService} from '../services/outbox-message.service';


@Injectable()
export class MessageOutboxResolver implements Resolve<MessageInterface> {
    constructor(private messageService: OutboxMessageService) {}

    public resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<MessageInterface> | Promise<MessageInterface> | MessageInterface {
        return this.messageService.readMessage(+route.params.id);
    }

}
