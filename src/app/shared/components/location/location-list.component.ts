import {Component, Input, OnInit} from '@angular/core';
import {GridSizesInterface} from '@app/core/interfaces/grid-sizes-interface';
import {LocationService} from '@app/core/services/location.service';
import {TimezoneService} from '@app/core/services/timezone.service';
import {AbstractListComponent} from '@app/shared/components/abstract-list/abstract-list.component';
import {ClientLocationInterface} from '@app/shared/interfaces/client-location-interface';
import {LocationApiServiceInterface} from '@app/shared/interfaces/location-api-service-interface';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
    selector: 'app-location-list',
    templateUrl: './location-list.component.html',
    styleUrls: ['./location-list.component.scss'],
})
export class LocationListComponent extends AbstractListComponent<ClientLocationInterface> implements OnInit {

    @Input() public gridSizes: GridSizesInterface;
    @Input() public masterId: number;
    public timezoneList$: BehaviorSubject<Array<{ value: string, display_name: string }>> =
        new BehaviorSubject<Array<{ value: string, display_name: string }>>([]);

    constructor(
        private readonly locationService: LocationService,
        private readonly timezoneService: TimezoneService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initTimezoneList();
        super.ngOnInit();
    }

    protected getItems(): Observable<ClientLocationInterface[]> {
        return this.locationService.getList(this.apiService as LocationApiServiceInterface);
    }

    private initTimezoneList(): void {
        this.timezoneService.getTimezoneList().subscribe(
            list => this.timezoneList$.next(list)
        );
    }
}
