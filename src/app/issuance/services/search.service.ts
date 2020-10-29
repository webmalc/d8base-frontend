import {Injectable} from '@angular/core';
import {IssuanceFilterStateInterface} from '@app/issuance/interfaces/issuance-filter-state-interface';
import {SearchResultsInterface} from '@app/issuance/interfaces/search-results-interface';
import {MasterList} from '@app/master/models/master-list';
import {MasterLocationApiService} from '@app/master/services/master-location-api.service';
import {MasterReadonlyApiService} from '@app/master/services/master-readonly-api.service';
import {ServicesApiService} from '@app/service/services/services-api.service';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable()
export class SearchService {

    constructor(
        private readonly masterReadonlyApi: MasterReadonlyApiService,
        private readonly servicesApi: ServicesApiService,
        private readonly masterLocationApi: MasterLocationApiService
    ) {
    }

    public search(needle: string, filters?: IssuanceFilterStateInterface): Observable<SearchResultsInterface> {
        return this.servicesApi.get().pipe(
            switchMap(services => this.masterReadonlyApi.getByEntityId(services.results[0].professional).pipe(
                switchMap((master: MasterList) => this.masterLocationApi.getByClientId(master.id).pipe(
                    map(locations => ({master, services: services.results, masterLocationList: locations.results}))
                ))
            ))
        );
    }
}
