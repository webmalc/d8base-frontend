import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Region} from '@app/core/models/region';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {UserLocationMapComponent} from '@app/shared/components/user-location-map/user-location-map.component';
import {ClientLocationInterface} from '@app/shared/interfaces/client-location-interface';
import {SelectableCityOnSearchService} from '@app/shared/services/selectable-city-on-search.service';
import {SelectableCountryOnSearchService} from '@app/shared/services/selectable-country-on-search.service';
import {SelectableDistrictOnSearchService} from '@app/shared/services/selectable-district-on-search.service';
import {SelectableRegionOnSearchService} from '@app/shared/services/selectable-region-on-search.service';
import {SelectableSubregionOnSearchService} from '@app/shared/services/selectable-subregion-on-search.service';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-location-item',
    templateUrl: './location-item.component.html',
    styleUrls: ['./location-item.component.scss'],
})
export class LocationItemComponent implements OnInit, AfterViewInit {

    @Input() public location: ClientLocationInterface;
    @Input() public index: number;
    @Input() public timezoneList$: BehaviorSubject<Array<{ value: string, display_name: string }>>;
    @Output() public save: EventEmitter<ClientLocationInterface> = new EventEmitter<ClientLocationInterface>();
    @Output() public delete: EventEmitter<{index: number, data: ClientLocationInterface}>
        = new EventEmitter<{index: number, data: ClientLocationInterface}>();
    @ViewChild(UserLocationMapComponent) public map: UserLocationMapComponent;
    public isDistrictEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public isRegionEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public isSubregionEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public isCityEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    constructor(
        public readonly countrySelectable: SelectableCountryOnSearchService,
        public readonly citySelectable: SelectableCityOnSearchService,
        public readonly regionSelectable: SelectableRegionOnSearchService,
        public readonly selectableSubregion: SelectableSubregionOnSearchService,
        public readonly districtSelectable: SelectableDistrictOnSearchService,
    ) {
    }

    public ngAfterViewInit(): void {
        this.map.invalidateSize();
    }

    public ngOnInit(): void {
        this.processDisabledFields(this.location);
    }

    public saveLocation(): void {
        this.save.emit(this.location);
    }

    public deleteLocation(): void {
        this.delete.emit({index: this.index, data: this.location});
    }

    public onCityChange(): void {
        this.isDistrictEnabled$.next(true);
    }

    public onRegionChange(): void {
        this.isSubregionEnabled$.next(true);
    }

    public onCountryChange(): void {
        this.isCityEnabled$.next(true);
        this.isRegionEnabled$.next(true);
    }

    public getCountryValue(): Country {
        return this.location?.country as Country;
    }

    public getRegionValue(): Region {
        return this.location?.region as Region;
    }

    public getCityValue(): City {
        return this.location?.city as City;
    }

    private processDisabledFields(location?: ClientLocationInterface): void {
        if (!location?.country) {
            this.isCityEnabled$.next(false);
            this.isRegionEnabled$.next(false);
            this.isSubregionEnabled$.next(false);
            this.isDistrictEnabled$.next(false);
        }
        if (!location?.region) {
            this.isSubregionEnabled$.next(false);
        }
        if (!location?.city) {
            this.isDistrictEnabled$.next(false);
        }
    }
}
