import {Component} from '@angular/core';
import {MasterManagerService} from '@app/core/services';
import {MasterReadonlyApiCacheService} from '@app/my-orders/services/master-readonly-api-cache.service';
import {Observable} from 'rxjs';
import {ServicesApiCache} from './services';

@Component({
    selector: 'app-my-orders-page',
    templateUrl: './my-orders-page.component.html',
    styleUrls: ['./my-orders-page.component.scss'],
    providers: [ServicesApiCache, MasterReadonlyApiCacheService]
})
export class MyOrdersPageComponent {
    public isInbox: boolean = false;
    public isMaster$: Observable<boolean>;

    constructor(private readonly masterManager: MasterManagerService) {
        this.isMaster$ = masterManager.isMaster$.asObservable();
    }
}
