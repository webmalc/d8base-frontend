import {ActivatedRoute} from '@angular/router';
import {MessageService} from '@app/message/services/message.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Provider} from '@angular/core';
import {environment} from '../../../environments/environment';
import {MessageBoxType} from '@app/message/enums/message-box-type';

const endpointMap: { [key in MessageBoxType]: string } = {
    inbox: environment.backend.communication_messages_received,
    outbox: environment.backend.communication_messages_sent
};

const messageServiceFactory = (route: ActivatedRoute, apiClient: ApiClientService): MessageService => {
    const type: string = route.snapshot.data.boxType;

    return new MessageService(apiClient, endpointMap[type]);
};

export const messageServiceProvider: Provider = {
    provide: MessageService,
    useFactory: messageServiceFactory,
    deps: [ActivatedRoute, ApiClientService]
};

