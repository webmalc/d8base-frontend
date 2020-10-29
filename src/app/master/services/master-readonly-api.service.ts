import {Injectable} from '@angular/core';
import {AbstractReadonlyApiService} from '@app/core/abstract/abstract-readonly-api.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {MasterList} from '@app/master/models/master-list';
import {environment} from '@env/environment';
import {plainToClass} from 'class-transformer';

@Injectable({
    providedIn: 'root'
})
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
