import {Injectable} from '@angular/core';
import {AbstractReadonlyApiService} from '@app/core/abstract/abstract-readonly-api.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {LatestMessageInterface} from '@app/message/interfaces/latest-message-interface';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class LatestMessagesApiService extends AbstractReadonlyApiService<LatestMessageInterface> {

    private readonly url = environment.backend.latest_messages;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    public getByEntityId(entityId: number): Observable<LatestMessageInterface> {
        throw Error('use get');
    }

    public getList(ids: number[]): Observable<LatestMessageInterface[]> {
        throw Error('use get');
    }

    protected getUrl(): string {
        return this.url;
    }

    protected transform(data: LatestMessageInterface[]): LatestMessageInterface[] {
        return data;
    }
}
