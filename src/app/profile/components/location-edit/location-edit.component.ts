import {Location} from '@angular/common';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Region} from '@app/core/models/region';
import {UserLocation} from '@app/core/models/user-location';
import {HelperService} from '@app/core/services/helper.service';
import {LocationService} from '@app/core/services/location.service';
import {UserLocationApiService} from '@app/core/services/location/user-location-api.service';
import {TimezoneService} from '@app/core/services/timezone.service';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {UserLocationMapComponent} from '@app/shared/components/user-location-map/user-location-map.component';
import {ClientLocationInterface} from '@app/shared/interfaces/client-location-interface';
import {SelectableCityOnSearchService} from '@app/shared/services/selectable-city-on-search.service';
import {SelectableCountryOnSearchService} from '@app/shared/services/selectable-country-on-search.service';
import {SelectableDistrictOnSearchService} from '@app/shared/services/selectable-district-on-search.service';
import {SelectableRegionOnSearchService} from '@app/shared/services/selectable-region-on-search.service';
import {SelectableSubregionOnSearchService} from '@app/shared/services/selectable-subregion-on-search.service';
import {plainToClass} from 'class-transformer';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-location-edit',
    templateUrl: './location-edit.component.html',
    styleUrls: ['./location-edit.component.scss'],
})
export class LocationEditComponent implements OnInit {

    public item: ClientLocationInterface = new UserLocation();
    public timezoneList$: BehaviorSubject<Array<{ value: string, display_name: string }>> =
        new BehaviorSubject<Array<{value: string, display_name: string}>>(null);
    @ViewChild(UserLocationMapComponent) public map: UserLocationMapComponent;
    public isDistrictEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public isRegionEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public isSubregionEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public isCityEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public locationId: number;

    constructor(
        private route: ActivatedRoute,
        private userLocationApi: UserLocationApiService,
        public readonly countrySelectable: SelectableCountryOnSearchService,
        public readonly citySelectable: SelectableCityOnSearchService,
        public readonly regionSelectable: SelectableRegionOnSearchService,
        public readonly selectableSubregion: SelectableSubregionOnSearchService,
        public readonly districtSelectable: SelectableDistrictOnSearchService,
        private readonly locationService: LocationService,
        private readonly timezone: TimezoneService,
        private location: Location
    ) { }

    public ngOnInit(): void {
        this.locationId = parseInt(this.route.snapshot.paramMap.get('location-id'), 10);
        if (this.locationId) {
            this.locationService.getSingle<UserLocation>(this.userLocationApi, this.locationId).subscribe(
                location => {
                    this.item = location;
                    this.processDisabledFields(this.item);
                    UserLocationMapComponent.forceInvalidate.next(true);
                }
            );
        } else {
            this.processDisabledFields(this.item);
            UserLocationMapComponent.forceInvalidate.next(true);
        }
        this.timezone.getTimezoneList().subscribe(
            data => this.timezoneList$.next(data)
        );
    }

    public delete(): void {
        this.userLocationApi.delete(this.item).subscribe(
            () => this.location.back()
        );
    }

    public save(): void {
        if (this.locationId) {
            this.userLocationApi.patch(this.prepare(this.item)).subscribe(
                data => this.location.back()
            );
        } else {
            this.userLocationApi.create(this.prepare(this.item)).subscribe(
                data => console.log('created')
            );
        }
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
        return this.item?.country as Country;
    }

    public getRegionValue(): Region {
        return this.item?.region as Region;
    }

    public getCityValue(): City {
        return this.item?.city as City;
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

    private prepare(data: any): UserLocation {
        const model = plainToClass(UserLocation, data, {excludeExtraneousValues: true});
        model.city = data.city?.id ?? undefined;
        model.country = data.country?.id ?? undefined;
        model.region = data.region?.id ?? undefined;
        model.subregion = data.subregion?.id ?? undefined;
        model.district = data.district?.id ?? undefined;
        model.timezone = data.timezone?.value ?? undefined;
        model.is_default = data.is_default?.value ?? undefined;

        return HelperService.clean<UserLocation>(model);
    }
}
