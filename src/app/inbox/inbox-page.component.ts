import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {OrderModel} from '@app/core/models/order-model';

import {Tabs} from './enums/tabs.enum';
import {ReceivedOrdersApiService} from './services';

@Component({
    selector: 'app-inbox-page',
    templateUrl: './inbox-page.component.html',
    styleUrls: ['./inbox-page.component.scss']
})
export class InboxPageComponent implements OnInit {
    public orders: OrderModel[];
    public tabs = Tabs;
    public currentTab: Tabs = Tabs.new;

    constructor(
        private readonly receivedOrdersApi: ReceivedOrdersApiService,
        private readonly changeDetector: ChangeDetectorRef
    ) {
    }

    public ngOnInit(): void {
        this.receivedOrdersApi.get().subscribe(orders => {
            this.orders = orders.results;
            this.changeDetector.markForCheck();
        });
    }

    public changeTab(e: CustomEvent): void {
        this.currentTab = e.detail.value;
    }
}
