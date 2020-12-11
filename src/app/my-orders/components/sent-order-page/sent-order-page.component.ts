import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SentOrder} from '@app/core/models/sent-order';
import {SentOrdersApiService} from '@app/order/services';
import {MasterReadonlyApiCacheService, ServicesApiCache} from '@app/shared/services';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-order-page',
    templateUrl: './sent-order-page.component.html',
    styleUrls: ['./sent-order-page.component.scss'],
    providers: [ServicesApiCache, MasterReadonlyApiCacheService]
})
export class SentOrderPageComponent {

    public order$: Observable<SentOrder>;

    constructor(route: ActivatedRoute, sentOrdersApi: SentOrdersApiService) {
        this.order$ = route.params.pipe(
            map(params => Number.parseInt(params.id, 10)),
            switchMap(id => id ? sentOrdersApi.getByEntityId(id) : of<SentOrder>())
        );
    }
}
