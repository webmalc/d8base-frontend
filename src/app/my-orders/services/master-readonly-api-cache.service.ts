import {Injectable} from '@angular/core';
import {ApiCache} from '@app/core/abstract/api-cache.service';
import {MasterList} from '@app/master/models/master-list';
import {MasterReadonlyApiService} from '@app/master/services/master-readonly-api.service';

@Injectable()
export class MasterReadonlyApiCacheService extends ApiCache<MasterList> {
    constructor(protected readonly apiService: MasterReadonlyApiService) {
        super();
    }
}
