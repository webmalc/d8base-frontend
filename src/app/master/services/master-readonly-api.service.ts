import {Injectable} from '@angular/core';
import {AbstractReadonlyApiService} from '@app/core/abstract/abstract-readonly-api.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {MasterList} from '@app/master/models/master-list';
import {plainToClass} from 'class-transformer';
import {environment} from '../../../environments/environment';

@Injectable()
export class MasterReadonlyApiService extends AbstractReadonlyApiService<MasterList> {

    private readonly url = environment.backend.master_list;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: MasterList[]): MasterList[] {
        return plainToClass(MasterList, data);
    }
}
