import {Injectable} from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {SentMessage} from '@app/message/models/sent-message';
import {plainToClass} from 'class-transformer';
import {environment} from '../../../environments/environment';

@Injectable()
export class MessagesSentApiService extends AbstractApiService<SentMessage> {

    private readonly url = environment.backend.messages_sent;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: SentMessage | SentMessage[]): SentMessage | SentMessage[] {
        return plainToClass(SentMessage, data);
    }
}
