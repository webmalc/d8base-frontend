import {InboxMessageService} from '@app/message/services/inbox-message.service';
import {Provider} from '@angular/core';
import {MessageBoxType} from '@app/message/enums/message-box-type';
import {BOX_TYPE} from '@app/message/providers/box-type.provider';
import {OutboxMessageService} from '@app/message/services/outbox-message.service';
import {AbstractMessageService} from '@app/message/services/abstract-message.service';

type BoxType = { [key in MessageBoxType]: string };

// const endpointMap: BoxType = {
//     inbox: environment.backend.communication_messages_received,
//     outbox: environment.backend.communication_messages_sent
// };

const messageServiceFactory = (
    inboxMessageService: InboxMessageService,
    outboxMessageService: OutboxMessageService,
    boxType: string
): AbstractMessageService => {
    if (boxType === MessageBoxType.INBOX) {
        return inboxMessageService;
    }
    if (boxType === MessageBoxType.OUTBOX) {
        return outboxMessageService;
    }
};

export const messageServiceProvider: Provider = {
    provide: AbstractMessageService,
    useFactory: messageServiceFactory,
    deps: [InboxMessageService, OutboxMessageService, BOX_TYPE]
};

