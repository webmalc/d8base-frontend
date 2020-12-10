import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MasterManagerService} from '@app/core/services';
import {MasterReadonlyApiCacheService} from '@app/my-orders/services/master-readonly-api-cache.service';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ServicesApiCache} from './services';

@Component({
    selector: 'app-my-orders-page',
    templateUrl: './my-orders-page.component.html',
    styleUrls: ['./my-orders-page.component.scss'],
    providers: [ServicesApiCache, MasterReadonlyApiCacheService]
})
export class MyOrdersPageComponent {
    public state$: Observable<{ isMaster: boolean, isInbox: boolean }>;
    constructor(
        masterManager: MasterManagerService,
        route: ActivatedRoute
    ) {
        this.state$ = combineLatest([
            masterManager.isMaster$.asObservable(),
            route.data
        ]).pipe(
            map(([isMaster, data]) => ({ isMaster, isInbox: data.isInbox }))
        );
    }
}
