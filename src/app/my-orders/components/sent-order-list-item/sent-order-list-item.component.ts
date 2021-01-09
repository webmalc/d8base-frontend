import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {SafeResourceUrl} from '@angular/platform-browser';
import {ProfessionalList} from '@app/api/models';
import {SentOrder} from '@app/core/models/sent-order';
import {ServicesApiCache} from '@app/core/services/cache';
import {MasterReadonlyApiCacheService} from '@app/core/services/cache/master-readonly-api-cache.service';
import {HelperService} from '@app/core/services/helper.service';
import {Service} from '@app/service/models/service';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-sent-order-list-item',
    templateUrl: './sent-order-list-item.component.html',
    styleUrls: ['./sent-order-list-item.component.scss'],
})
export class SentOrderListItemComponent {

    public service: Service;
    public master: ProfessionalList;

    private _order: Partial<SentOrder>;

    constructor(
        private readonly servicesCache: ServicesApiCache,
        private readonly changeDetector: ChangeDetectorRef,
        private readonly masterCache: MasterReadonlyApiCacheService,
    ) {
    }

    public get order(): Partial<SentOrder> {
        return this._order || {};
    }

    @Input()
    public set order(order: Partial<SentOrder>) {
        this._order = order;
        if (!order) {
            return;
        }
        this.servicesCache.getById(order.service).pipe(
            switchMap(service => {
                this.service = service;

                return this.masterCache.getById(service.professional);
            }),
        ).subscribe(master => {
            this.master = master;
            this.changeDetector.markForCheck();
        });
    }

    public getPhoto(photo: string): string | SafeResourceUrl {
        return photo || HelperService.getNoAvatarLink();
    }
}
