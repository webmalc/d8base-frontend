import {Injectable} from '@angular/core';
import {ApiCache} from '@app/core/abstract/api-cache.service';
import {ServicesReadonlyApiService} from '@app/core/services/services-readonly-api.service';
import {Service} from '@app/service/models/service';

@Injectable()
export class ServicesApiCache extends ApiCache<Service> {
    constructor(protected readonly apiService: ServicesReadonlyApiService) {
        super();
    }
}
