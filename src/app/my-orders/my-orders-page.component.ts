import {Component, OnInit} from '@angular/core';
import {MasterManagerService} from '@app/core/services';
import {MasterReadonlyApiCacheService} from '@app/my-orders/services/master-readonly-api-cache.service';
import {ServicesApiCache} from './services';

@Component({
    selector: 'app-my-orders-page',
    templateUrl: './my-orders-page.component.html',
    styleUrls: ['./my-orders-page.component.scss'],
    providers: [ServicesApiCache, MasterReadonlyApiCacheService]
})
export class MyOrdersPageComponent implements OnInit {
    public isInbox: boolean = false;
    public isMaster: boolean;

    constructor(private readonly masterManager: MasterManagerService) {
    }

    public ngOnInit(): void {
        this.masterManager.isMaster().subscribe(res => this.isMaster = res);
    }
}
