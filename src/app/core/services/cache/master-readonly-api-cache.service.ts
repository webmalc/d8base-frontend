import { Injectable } from '@angular/core';
import { ProfessionalList } from '@app/api/models';
import { ApiCache } from '@app/core/abstract/api-cache.service';
import { MasterReadonlyApiService } from '@app/master/services/master-readonly-api.service';

@Injectable()
export class MasterReadonlyApiCacheService extends ApiCache<ProfessionalList> {
    constructor(protected readonly apiService: MasterReadonlyApiService) {
        super();
    }
}
